# Certificates & Files
.key is the private key. This is accessible the key owner and no one else.

.csr is the certificate request. This is a request for a certificate authority to sign the key. (The key itself is not included.)

.crt is the certificate produced by the certificate authority that verifies the authenticity of the key. (The key itself is not included.) This is given to other parties, e.g. HTTPS client.

.pem is a text-based container using base-64 encoding. It could be any of the above files.

.p12 is a PKCS12 file, which is a container format usually used to combine the private key and certificate.

## 1. Generate CA key
```sh
openssl genrsa -des3 -out ca.key 4096
# Passkey: mutualSSL-ca-key
```

## 2. Generate CA certificate using the CA key
```sh
openssl req -new -x509 -days 365 -key ca.key -out ca.pem
# -sha256 -nodes
# COUNTRY: BE
# STATE/PROVINCE: .
# LOCALITY: .
# ORGANIZATION NAME: .
# ORGANIZATION UNIT: .
# COMMON NAME: lavrenov.io
# EMAIL: ca@lavrenov.io
```
To renew this certificate, just use the same command to create a new .crt file.
To view what you input, use
```sh
openssl x509 -in ca.pem -noout -text
```

## 3. Install the CA certificate (also called Root certificate) on your system.
* On MacOS: 
    1. open Keychain Access
    2. File -> Import -> ca.pem
    3. Double click the certificate
    4. Expand "Trust", choose "always trust"<br><br>

* On Windows10: (tbd)
* On Linux: (tbd)
* On iOS14: (tbd)
* On Android: (tbd)

## 4. Create certificate request for your website
Generate private key
```sh
openssl genrsa -out mssl.lavrenov.io.key 4096
```
Generate CSR
```sh
openssl req -new -key mssl.lavrenov.io.key -out mssl.lavrenov.io.csr
# COUNTRY: BE
# STATE/PROVINCE: .
# LOCALITY: .
# ORGANIZATION NAME: .
# ORGANIZATION UNIT: .
# COMMON NAME: mssl.lavrenov.io
# EMAIL: mssl@lavrenov.io
# Challenge Password: mutualSSL-challenge
```

## 5. Generate X509 V3 certificate extension config for SAN
```sh
# create domain.ext file, and paste the following into it:
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = mssl.lavrenov.io
```

Generate cert
```sh
openssl x509 \
  -req \
  -in mssl.lavrenov.io.csr \
  -CA ca.pem \
  -CAkey ca.key \
  -CAcreateserial \
  -out mssl.lavrenov.io.crt \
  -days 365 \
  -sha256 \
  -extfile mssl.lavrenov.io.ext
``` 

## 6. Generate Client certificate
```sh
# sign request
openssl req \
  -newkey rsa:4096 \
  -keyout client.key \
  -out client.csr \
  -nodes \
  -days 30 \
  -subj "/CN=client"

# use request to gen cert
openssl x509 \ 
  -req \
  -in client.csr \
  -out client.crt \
  -CA ca.pem \
  -CAkey ca.key \
  -CAcreateserial \
  -days 30
```




## Sources
* https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/#becoming-certificate-authority
* https://fardog.io/blog/2017/12/30/client-side-certificate-authentication-with-nginx/
* https://stackoverflow.com/questions/24994068/client-certificate-prompt-not-showing-nginx
* https://medium.com/geekculture/mtls-with-nginx-and-nodejs-e3d0980ed950
* https://smallstep.com/hello-mtls/doc/server/nodejs
* https://github.com/pandashavenobugs/mTLS-with-node-blogpost
* https://stackoverflow.com/questions/15014288/browser-is-not-prompting-for-a-client-certificate
* https://medium.com/wottsecurity/configuring-nginx-with-client-certificate-authentication-mtls-dd89fb8f262a
* https://dev.to/dinckan_berat/mutual-tlsmtls-with-nginx-and-nodejs-3ahp
* https://serverfault.com/questions/761280/nginx-does-not-prompt-for-client-ssl-certificate
* https://help.hcltechsw.com/safelinx/1.2/adminguide/creating_a_self-signed_certificate.html
* https://www.ibm.com/docs/en/api-connect/5.0.x?topic=profiles-generating-pkcs12-file-certificate-authority