package self.learning.kafka.dto;

import java.util.List;

public class PartitionHealthDto {

    private int partition;
    private Integer leader;
    private List<Integer> replicas;
    private List<Integer> isr;
    private long size;

    public PartitionHealthDto(int partition, Integer leader,
                              List<Integer> replicas,
                              List<Integer> isr,
                              long size) {
        this.partition = partition;
        this.leader = leader;
        this.replicas = replicas;
        this.isr = isr;
        this.size = size;
    }

    public int getPartition() { return partition; }
    public Integer getLeader() { return leader; }
    public List<Integer> getReplicas() { return replicas; }
    public List<Integer> getIsr() { return isr; }
    public long getSize() { return size; }
}
