package self.learning.kafka.controller;

import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.TopicDescription;
import org.apache.kafka.common.errors.TopicExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import self.learning.kafka.dto.KafkaMetadata;
import self.learning.kafka.dto.PartitionHealthDto;
import self.learning.kafka.service.KafkaUtilsService;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;

@RestController
@Slf4j
@RequestMapping("/kafka/v1")
public class KafKaUtilsController {

    @Autowired
    private KafkaUtilsService kafkaUtilsService;

    @PostMapping("/create")
    public ResponseEntity<KafkaMetadata> createTopic(@RequestBody KafkaMetadata kafkaMetadata){
        KafkaMetadata updatedMetadata = kafkaUtilsService.createTopic(kafkaMetadata);
        return new ResponseEntity<>(updatedMetadata, HttpStatus.CREATED);
    }

//    @PatchMapping("/update")
//    public ResponseEntity<KafkaMetadata> updateTopic(@RequestBody KafkaMetadata kafkaMetadata){
//        KafkaMetadata updateKafkaMetadata = kafkaUtilsService.update(kafkaMetadata);
//        return new ResponseEntity<>(updateKafkaMetadata, HttpStatus.ACCEPTED);
//    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteTopic(){
        Set<String> topicList = kafkaUtilsService.getTopicList();
        kafkaUtilsService.deleteTopic(topicList);
        return ResponseEntity.ok("DELETED topics: "+topicList);
    }

    @DeleteMapping("/delete/{topic}")
    public ResponseEntity<String> deleteTopic(@PathVariable String topicName){
        kafkaUtilsService.deleteTopic(Set.of(topicName));
        return ResponseEntity.ok("DELETED topic: "+topicName);
    }

    @GetMapping("/topics")
    public ResponseEntity<List<KafkaMetadata>> getTopics(){
        Set<String> topicSet = kafkaUtilsService.getTopicList();
        if (topicSet.isEmpty())
            throw new TopicExistsException("No topic available");

        List<KafkaMetadata> topicsDescriptionMap = kafkaUtilsService.describeTopics(topicSet.stream().toList());
        log.info("Kafka topics list: {}", topicSet);
        log.info("Kafka topics list stringTopicDescriptionMap: {}", topicsDescriptionMap);
        return new ResponseEntity<>(topicsDescriptionMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/topics/{topicname}")
    public ResponseEntity<List<String>> isTopicExist(@PathVariable String topicname){
        List<String> topicExist = kafkaUtilsService.isTopicExist(topicname);
        return new ResponseEntity<>(topicExist, HttpStatus.OK);
    }

    @GetMapping("/brokers")
    public ResponseEntity<?> kafkaBrokers(){
        Map<String, Map<Integer, Map<String, String>>> kafkaBrokers = kafkaUtilsService.getKafkaBrokers();
        return new ResponseEntity<>(kafkaBrokers, HttpStatus.ACCEPTED);
    }

    @GetMapping("/topics/{topic}/partitions")
    public ResponseEntity<List<PartitionHealthDto>> getPartitionHealth(@PathVariable String topic)
            throws ExecutionException, InterruptedException {
        List<PartitionHealthDto> partitionHealthDtoList = kafkaUtilsService.getPartitionHealth(topic);
        return new ResponseEntity<>(partitionHealthDtoList, HttpStatus.OK);
    }
}
