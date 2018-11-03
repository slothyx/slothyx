package com.slothyx.spotify.util;

import org.apache.http.Header;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URI;

import static org.testng.Assert.*;

public class HttpUriRequestMatcher {
    private URI uri;
    private HttpUriRequest request;

    public HttpUriRequestMatcher(URI uri) {
        this.uri = uri;
    }

    public HttpUriRequestMatcher(HttpUriRequest request) {
        this.request = request;
    }

    public HttpUriRequestMatcher host(String host) {
        assertEquals(getURI().getHost(), host);
        return this;
    }

    public HttpUriRequestMatcher scheme(String scheme) {
        assertEquals(getURI().getScheme(), scheme);
        return this;
    }

    public HttpUriRequestMatcher path(String path) {
        assertEquals(getURI().getPath(), path);
        return this;
    }

    public HttpUriRequestMatcher method(String method) {
        assertEquals(request.getMethod(), method);
        return this;
    }

    public HttpUriRequestMatcher bodyContains(String string) {
        assertTrue(request instanceof HttpEntityEnclosingRequest);
        try {
            String body = EntityUtils.toString(((HttpEntityEnclosingRequest) request).getEntity());
            assertTrue(body.contains(string));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return this;
    }

    public HttpUriRequestMatcher queryContains(String string) {
        assertTrue(getURI().getQuery().contains(string));
        return this;
    }

    public HttpUriRequestMatcher containsHeader(String name, String value) {
        if (request.getHeaders(name).length == 0) {
            fail("no header found: " + name);
        }
        for (Header header : request.getHeaders(name)) {
            assertEquals(header.getValue(), value);
        }
        return this;
    }

    private URI getURI() {
        if (uri != null) {
            return uri;
        }
        return request.getURI();
    }
}
