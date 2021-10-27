package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.UserNotFoundException;
import com.revature.dungeonsite.models.*;
import com.revature.dungeonsite.repositories.AddressRepository;
import com.revature.dungeonsite.repositories.UserAddressRepository;
import com.revature.dungeonsite.repositories.UserRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import com.revature.dungeonsite.utils.PasswordUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final AddressRepository address;
    private final UserAddressRepository uar;

    public AuthController(UserRepository users,
                          AddressRepository address,
                          UserAddressRepository uar) {
        this.users = users;
        this.address = address;
        this.uar =uar;
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody SiteUser testUser) throws UserNotFoundException {
        SiteUser checkVs = users.findByUsername(testUser.getUsername());
        if (checkVs == null) {
            String messageString = "User Not found: " + testUser.getUsername();
            throw new UserNotFoundException(messageString);
        } else if (PasswordUtils.isMatch(testUser.getPassword(), checkVs.getPassword()) ) {
            return new LoginResponse(checkVs);
        } else {
            return null;
        }
    }

    @PostMapping("/register")
    public SiteUser registerUser(@RequestBody SiteUser neoUser) {
        neoUser.setUserID(KeyUtils.nextKey() );
        neoUser.setPassword(PasswordUtils.encrypt(neoUser.getPassword()) );
        return this.users.save(neoUser);
    }

    @PostMapping("/registeruseraddress")
    public RegisterUserAddressResponse registerUserAddress(@RequestBody RegisterUserAddressPacket ruap) {
        SiteUser neoUser = ruap.getUser();
        Address neoAddress = ruap.getAddress();

        neoUser.setUserID(KeyUtils.nextKey());
        neoAddress.setAddressID(KeyUtils.nextKey());

        UserAddress ua = new UserAddress(
                KeyUtils.nextKey(),
                neoUser.getUserID(),
                neoAddress.getAddressID()
        );

        neoUser.setPassword(PasswordUtils.encrypt(neoUser.getPassword()) );
        neoUser = this.users.save(neoUser);
        neoAddress = this.address.save(neoAddress);
        ua = this.uar.save(ua);
        return new RegisterUserAddressResponse(
                neoUser,
                neoAddress,
                ua
        );
    }


}
