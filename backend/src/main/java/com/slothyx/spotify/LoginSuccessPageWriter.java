package com.slothyx.spotify;

import org.springframework.web.util.HtmlUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

public class LoginSuccessPageWriter {
    private static final String loginSuccessTemplate = readTemplate();

    private static String readTemplate() {
        try {
            Reader in = new InputStreamReader(LoginSuccessPageWriter.class.getResourceAsStream("loginSuccessResponse.html"), StandardCharsets.UTF_8);
            StringBuilder sb = new StringBuilder();
            char[] buf = new char[1024];
            while (in.read(buf) != -1) {
                sb.append(buf);
            }
            return sb.toString();
        } catch (IOException e) {
            throw new RuntimeException("error reading login success template", e);
        }
    }

    public static void write(String oauthResponse, PrintWriter writer) {
        writer.write(loginSuccessTemplate.replaceAll("\\$oauthResponse", HtmlUtils.htmlEscape(oauthResponse)));
    }
}
