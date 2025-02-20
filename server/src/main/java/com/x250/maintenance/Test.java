package com.x250.maintenance;

import com.x250.maintenance.security.user.AppUser;
import com.x250.maintenance.security.user.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class Test {

    private final AppUserRepository userRepository;

    @GetMapping
    Collection<? extends GrantedAuthority> getUser() {
        AppUser user = null;
        Optional<AppUser> userOptional = userRepository.findByEmail("john@xx.pl");
        if(userOptional.isPresent()) {
           user = userOptional.get();
        }

        if(user != null) {
            System.out.println(user.getAuthorities());
            return user.getAuthorities();
        }
        return null;
    }
}