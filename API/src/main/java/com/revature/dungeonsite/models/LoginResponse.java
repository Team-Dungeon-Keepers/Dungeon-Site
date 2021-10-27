package com.revature.dungeonsite.models;


import com.revature.dungeonsite.utils.JWTTokenUtils;

public class LoginResponse {
    public String message;
    public SiteUser user;
    public String token;

    public LoginResponse(SiteUser model) {

        this.message = "Welcome, " + model.getUsername();
        this.user = model;
        this.token = JWTTokenUtils.generateJWT(model);
    }


}
