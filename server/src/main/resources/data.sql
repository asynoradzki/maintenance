INSERT INTO permissions (name)
VALUES ('READ'),
       ('WRITE');

INSERT INTO roles (name)
VALUES ('USER'),
       ('ADMIN');

INSERT INTO roles_permissions (role_id, permissions_id)
VALUES (1, 1),
       (2, 1),
       (2, 2);

INSERT INTO app_users (user_name, user_email, user_password, role_id)
VALUES ('John', 'john@xx.pl', '111', 1);

INSERT INTO users_permissions(user_id, permissions_id)
VALUES (1, 1),
       (1, 2);