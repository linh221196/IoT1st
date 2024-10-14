package com.example.springboot_test1;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/*")
public class testmapping {

    @GetMapping("/DeviceView")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("HELLO 이게 보이면 넌 성공한거야 ㅋㅋㅋㅋ");
    }
}
