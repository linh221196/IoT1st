package com.example.springboot_test1;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class HelloController {

    @GetMapping("/api/login")
    public String hello() {
        return "테스트인데 이거보면 성공.";
    }

}
