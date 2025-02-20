package com.x250.maintenance.security.permission;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PermissionService {
    private final PermissionRepository permissionRepository;

    public Set<Permission> findAllByNameIn(Set<String> permissionNames) {
        Set<Permission> permissions = permissionRepository.findAllByNameIn(permissionNames);
        System.out.println(permissions);
        if(permissions.isEmpty()) {
            throw new EntityNotFoundException("Given permissions do not exist i DB");
        }
        return permissions;
    }
}
