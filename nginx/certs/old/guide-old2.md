## create CA key & cert
openssl genrsa -des3 -out ca.key 4096
<!-- mutualSSL-ca-key -->
openssl req -new -x509 -days 365 -key ca.key -out ca.crt
openssl x509 -in ca.crt -noout -text

## create HTTPS cert for domain.



## create client sign request
openssl genrsa -des3 -out user.key 4096
<!-- mutualSSL-client-key -->
openssl req -new -key user.key -out user.csr <!-- recreate with FQDN -->
<!-- mutualSSL-challenge -->

## sign client csr with ca
openssl x509 -req -days 365 -in user.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out user.crt
<!-- mutualSSL-password -->

## creating pkcs 12
openssl pkcs12 -export -out user.pfx -inkey user.key -in user.crt -certfile ca.crt

IMPORT IT INTO KEYCHAIN. GO TO BROWSER. WIN.