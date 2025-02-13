package com.x250.maintenance;

import com.x250.maintenance.security.user.Role;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.x250.maintenance.security.user.Role.ADMIN;

//@RestController
//@RequestMapping("/api/v1")
//public class Test {
//
//    public Role role = ADMIN;
//    @GetMapping
//    List<String> getRole() {
//        List<String> list = new ArrayList<>();
//        list.add(role.getAuthorities().toString());
//        list.add(role.getPermissions().toString());
//        return list;
//    }
//}
