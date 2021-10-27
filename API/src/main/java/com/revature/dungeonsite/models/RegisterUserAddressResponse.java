package com.revature.dungeonsite.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  @AllArgsConstructor
public class RegisterUserAddressResponse {
    @Getter  @Setter
    private SiteUser user;

    @Getter  @Setter
    private Address address;

    @Getter  @Setter
    private UserAddress ua;

}
