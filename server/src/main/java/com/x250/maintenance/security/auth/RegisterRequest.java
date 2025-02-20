package com.x250.maintenance.security.auth;


import jakarta.validation.constraints.*;

import java.util.Set;

public record RegisterRequest(
        @NotBlank(message = "name cannot be blank")
        String name,
        @Email(
                regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
                message = "email must be correctly formatted"
        )
        String email,
        @NotBlank(message = "password cannot be blank")
        @Size(min = 8, message = "password must be at least 8 characters long")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
                message = "password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
        String password,

        @NotBlank(message = "role cannot be blank")
        String role,

        @NotEmpty(message = "Permissions set cannot be empty")
        Set<String> permissions
) {
}
