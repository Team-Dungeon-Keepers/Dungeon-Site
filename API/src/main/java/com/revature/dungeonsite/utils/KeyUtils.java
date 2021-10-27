package com.revature.dungeonsite.utils;

import java.util.Date;

public class KeyUtils {
    private static long lastKey;
    public static long nextKey() {
        Date tempDate = new Date();
        long neoKey = tempDate.getTime();
        if (neoKey <= lastKey) {
            return ++lastKey;
        } else {
            lastKey = neoKey;
            return neoKey;
        }
    }
}
