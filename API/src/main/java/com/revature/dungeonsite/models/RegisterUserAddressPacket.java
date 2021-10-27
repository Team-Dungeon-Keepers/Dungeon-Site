package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

public class RegisterUserAddressPacket {
    @Getter  @Setter
    public SiteUser user;

    @Getter  @Setter
    public Address address;

}
