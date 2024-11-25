package com.cse389.tbd.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class User {
    private String id;
    private String username;
    private String password;
    private String email;

    public User() {}

    public User(String id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

}
