package com.x250.maintenance.security.auth;

import com.x250.maintenance.security.user.Role;

public record RegisterRequest(
    String name,
    String email,
    String password,
    Role role
) {
}
