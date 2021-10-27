package com.revature.dungeonsite.utils;


import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {
    public static String encrypt(String toEncode) {
        return BCrypt.hashpw(toEncode, BCrypt.gensalt(12));
    }

    public static boolean isMatch(String test, String key) {
        return (BCrypt.checkpw(test, key));
    }

}
