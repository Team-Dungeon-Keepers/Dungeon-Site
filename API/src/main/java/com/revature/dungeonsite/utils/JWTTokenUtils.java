package com.revature.dungeonsite.utils;


import com.revature.dungeonsite.models.SiteUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JWTTokenUtils {
    private static final String tokenSecret = System.getenv("TOKEN_SECRET");

    public static String generateJWT(SiteUser toEncrypt) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(tokenSecret);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder().setId(String.valueOf(toEncrypt.getUserID()) )
                .setIssuedAt(now)
                .setSubject(toEncrypt.getUsername())
                .setIssuer("Team Dungeon Keepers")
                .claim("ID", toEncrypt.getUserID())
                .claim("username", toEncrypt.getUsername())
                .signWith(signatureAlgorithm, signingKey);

        long expMilli = nowMillis + 9100000;
        Date exp = new Date(expMilli);
        builder.setExpiration(exp);

        return builder.compact();
    }

    public static Claims decodeJWT(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(tokenSecret))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }
}
