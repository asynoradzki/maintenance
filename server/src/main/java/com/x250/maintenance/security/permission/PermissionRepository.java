package com.x250.maintenance.security.permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    Set<Permission> findAllByNameIn(Set<String> permissions);
}
