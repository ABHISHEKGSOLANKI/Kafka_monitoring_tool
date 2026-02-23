package self.learning.kafka.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import self.learning.kafka.services.KafkaProducerServices;

@RestController
@RequestMapping("/kafka/producer/v1")
public class KafkaProducerController {

    @Autowired
    private KafkaProducerServices kafkaProducerServices;

    @GetMapping("/producers")
    public ResponseEntity<?> getProducers(){
        kafkaProducerServices.getProducers();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
