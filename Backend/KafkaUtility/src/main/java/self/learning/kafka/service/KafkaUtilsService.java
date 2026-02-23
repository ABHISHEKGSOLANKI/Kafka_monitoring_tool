package self.learning.kafka.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.Node;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.TopicPartitionInfo;
import org.apache.kafka.common.config.ConfigResource;
import org.apache.kafka.common.requests.DescribeLogDirsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import self.learning.kafka.dto.KafkaMetadata;
import self.learning.kafka.dto.PartitionHealthDto;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.stream.Collectors;

import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.Node;
import org.apache.kafka.clients.admin.DescribeLogDirsResult;
import org.apache.kafka.clients.admin.DescribeTopicsResult;
import org.apache.kafka.clients.admin.TopicDescription;


// 🔴 THESE TWO ARE THE IMPORTANT ONES
import org.apache.kafka.common.requests.DescribeLogDirsResponse.LogDirInfo;
import org.apache.kafka.common.requests.DescribeLogDirsResponse.ReplicaInfo;

@Service
@Slf4j
public class KafkaUtilsService {

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    @Autowired
    private AdminClient adminClient;

    public Set<String> getTopicList() {
        try {
            return adminClient.listTopics()
                    .names()
                    .get();
        } catch (InterruptedException | ExecutionException e) {
            e.getMessage();
        }
        return null;
    }

    public KafkaMetadata createTopic(KafkaMetadata kafkaMetadata) {
        KafkaMetadata updatedMetadata = null;
        try {
            // Define topic
            NewTopic newTopic = new NewTopic(
                    kafkaMetadata.topic(),
                    kafkaMetadata.partition(),      // number of partitions
                    kafkaMetadata.replificationFactor()  // replication factor
            );

            // Optional configs (VERY useful in real systems)
            newTopic.configs(Collections.singletonMap(
                    "retention.ms", kafkaMetadata.retention() // 7 days retention
            ));

            // Create topic
            CreateTopicsResult result =
                    adminClient.createTopics(Collections.singleton(newTopic));

            // Wait for result
            result.all().get();

            log.info("✅ Topic created successfully: {}", kafkaMetadata.topic());
            updatedMetadata = new KafkaMetadata(
                    kafkaMetadata.topic(),
                    kafkaMetadata.partition(),
//                    kafkaMetadata.headers(),
                    kafkaMetadata.replificationFactor(),
                    kafkaMetadata.retention(),
                    LocalDateTime.now()
            );
            return updatedMetadata;

        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public List<String> isTopicExist(String topic) {
        try {
            ListTopicsOptions options = new ListTopicsOptions();
            options.listInternal(false); // ignore __consumer_offsets

            Set<String> names = adminClient.listTopics(options)
                    .names()
                    .get();

            if(names.contains(topic))
                return List.of(topic);

        } catch (Exception e) {
            throw new RuntimeException("Failed to check topic existence", e);
        }
        return null;
    }

    public List<KafkaMetadata> describeTopics(List<String> topics) {
        List<KafkaMetadata> result = new ArrayList<>();

        try {
            // 1️⃣ Get all topics
            Set<String> topicNames = adminClient.listTopics().names().get();

            // 2️⃣ Describe topics (for partitions / replication)
            Map<String, TopicDescription> descriptions =
                    adminClient.describeTopics(topicNames).all().get();

            // 3️⃣ Prepare config resources for retention lookup
            List<ConfigResource> resources = new ArrayList<>();
            for (String topic : topicNames) {
                resources.add(new ConfigResource(ConfigResource.Type.TOPIC, topic));
            }

            // 4️⃣ Fetch configs
            Map<ConfigResource, Config> configs =
                    adminClient.describeConfigs(resources).all().get();

            // 5️⃣ Combine everything
            for (String topic : topicNames) {

                TopicDescription desc = descriptions.get(topic);

                int partitions = desc.partitions().size();
                int replicationFactor =
                        desc.partitions().get(0).replicas().size();

                Config config = configs.get(
                        new ConfigResource(ConfigResource.Type.TOPIC, topic));

                String retentionMs =
                        getConfigValue(config, "retention.ms");

                result.add(new KafkaMetadata(
                        topic,
                        partitions,
                        (short) replicationFactor,
                        retentionMs,
                        LocalDateTime.now()
                ));
            }

        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Failed to fetch topic details", e);
        }

        return result;
    }
    private String getConfigValue(Config config, String key) {
        ConfigEntry entry = config.get(key);
        return entry != null ? entry.value() : "default";
    }

    public void deleteTopic(Set<String> topicList) {
        topicList.forEach(topicName ->{
            DeleteTopicsResult result =
                    adminClient.deleteTopics(Collections.singletonList(topicName));
            // Wait for operation to complete
            try {
                result.all().get();
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException(e);
            }

            log.info("Topic '{}' deleted successfully", topicName);
        });
    }

    public Map<String, Map<Integer, Map<String,String>>> getKafkaBrokers() {
        Map<String, Map<Integer, Map<String,String>>> brokers = new HashMap<>();
// ---- ACTIVE BROKERS ----
        Collection<Node> activeNodes =
                null;
        try {
            activeNodes = adminClient.describeCluster().nodes().get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }

        Map<Integer, Map<String, String>> activeIds = new HashMap<>();
        log.info("ACTIVE BROKERS:");
        for (Node node : activeNodes) {
            Map<String, String> map = new HashMap<>();
            map.put("host", node.host());
            map.put("port", String.valueOf(node.port()));
            map.put("id", String.valueOf(node.id()));
            activeIds.put(node.id(), map);
            log.info("ID=" + node.id()
                    + " HOST=" + node.host()
                    + ":" + node.port());
        }
        brokers.put("active", activeIds);
        Set<Integer> expectedIds = new HashSet<>();
        try {
        // ---- EXPECTED BROKERS (from configs stored in cluster) ----
        DescribeConfigsResult configs =
                adminClient.describeConfigs(activeNodes.stream()
                        .map(node -> new ConfigResource(
                                ConfigResource.Type.BROKER,
                                String.valueOf(node.id())))
                        .toList());



            configs.all().get().forEach((res, conf) ->
                    expectedIds.add(Integer.parseInt(res.name()))
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        // ---- FIND DOWN ----
        Map<Integer, Map<String, String>> inActiveIds = new HashMap<>();
        Set<Integer> integers = activeIds.keySet();
        expectedIds.removeAll(integers);
        expectedIds.forEach(inActiveBroker ->{
            inActiveIds.put(inActiveBroker, null);
        });

        brokers.put("inactive", inActiveIds);

        log.info("\nDOWN BROKERS:");
        if (expectedIds.isEmpty()) {
            log.info("None");
        } else {
            expectedIds.forEach(id ->
                    log.info("Broker ID " + id + " is DOWN"));

        }
        return brokers;

    }

    public List<PartitionHealthDto> getPartitionHealth(String topic)
            throws ExecutionException, InterruptedException {

        // -------- 1️⃣ Describe Topic --------
        DescribeTopicsResult topicsResult =
                adminClient.describeTopics(Collections.singletonList(topic));

        TopicDescription topicDescription =
                topicsResult.all().get().get(topic);

        // -------- 2️⃣ Get LogDir Info (Partition Size) --------

        Collection<Node> brokers = adminClient.describeCluster().nodes().get();

        DescribeLogDirsResult logDirsResult =
                adminClient.describeLogDirs(
                        brokers.stream().map(Node::id).toList()
                );

        Map<Integer, Map<String, LogDirInfo>> logDirMap =
                logDirsResult.all().get();

        Map<Integer, Long> partitionSizes = new HashMap<>();

        for (Map<String, LogDirInfo> brokerLogDirs : logDirMap.values()) {

            for (LogDirInfo logDirInfo : brokerLogDirs.values()) {

                Map<TopicPartition, ReplicaInfo> replicas =
                        logDirInfo.replicaInfos;

                for (Map.Entry<TopicPartition, ReplicaInfo> entry : replicas.entrySet()) {

                    TopicPartition tp = entry.getKey();
                    ReplicaInfo replicaInfo = entry.getValue();

                    if (!tp.topic().equals(topic)) continue;

                    partitionSizes.merge(
                            tp.partition(),
                            replicaInfo.size,
                            Long::sum
                    );
                }
            }
        }

        // -------- 3️⃣ Build Response --------
        List<PartitionHealthDto> result = new ArrayList<>();

        for (TopicPartitionInfo pInfo : topicDescription.partitions()) {

            int partition = pInfo.partition();

            Integer leader = pInfo.leader() != null ? pInfo.leader().id() : null;

            List<Integer> replicas = pInfo.replicas()
                    .stream()
                    .map(Node::id)
                    .collect(Collectors.toList());

            List<Integer> isr = pInfo.isr()
                    .stream()
                    .map(Node::id)
                    .collect(Collectors.toList());

            long size = partitionSizes.getOrDefault(partition, 0L);

            result.add(new PartitionHealthDto(partition, leader, replicas, isr, size));
        }

        return result;
    }

//    public KafkaMetadata update(KafkaMetadata kafkaMetadata) {
//        KafkaMetadata updateKafkaMetadata = null;
//        return n
//    }
}
