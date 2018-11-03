package com.slothyx.spotify.util;

import org.apache.http.Header;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URI;

public class HttpUriRequestComparer {
    private URI uri;
    private HttpUriRequest request;
    private boolean matches;

    public HttpUriRequestComparer(URI uri) {
        this.uri = uri;
        matches = true;
    }

    public HttpUriRequestComparer(HttpUriRequest request) {
        this.request = request;
        matches = true;
    }

    public HttpUriRequestComparer host(String host) {
        matches &= getURI().getHost().equals(host);
        return this;
    }

    public HttpUriRequestComparer scheme(String scheme) {
        matches &= getURI().getScheme().equals(scheme);
        return this;
    }

    public HttpUriRequestComparer path(String path) {
        matches &= getURI().getPath().equals(path);
        return this;
    }

    public HttpUriRequestComparer method(String method) {
        matches &= request.getMethod().equals(method);
        return this;
    }

    public HttpUriRequestComparer bodyContains(String string) {
        matches &= request instanceof HttpEntityEnclosingRequest;
        if (matches) {
            try {
                String body = EntityUtils.toString(((HttpEntityEnclosingRequest) request).getEntity());
                matches &= body.contains(string);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return this;
    }

    public HttpUriRequestComparer queryContains(String string) {
        matches &= getURI().getQuery().contains(string);
        return this;
    }

    public HttpUriRequestComparer containsHeader(String name, String value) {
        for (Header header : request.getHeaders(name)) {
            matches &= header.getValue().equals(value);
        }
        return this;
    }

    public boolean matches() {
        return matches;
    }

    private URI getURI() {
        if (uri != null) {
            return uri;
        }
        return request.getURI();
    }
}
