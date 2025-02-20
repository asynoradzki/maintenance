package com.x250.maintenance.security.role;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Role findByName(String roleName) {
       return roleRepository.findByName(roleName).orElseThrow(() -> new EntityNotFoundException("Given role does not exist i DB"));
    }
}
