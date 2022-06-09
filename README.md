# Mutual SSL
This is a demo project showcasing a way to use mutual SSL.

An overview of how it works: 

Client --Two-way-SSL--> Nginx Proxy ---http--> Server


## Setup & Installation
1. Edit your hosts file to redirect mssl.lavrenov.io to 127.0.0.1
    ```sh
    sudo nano /etc/hosts
    127.0.0.1 mssl.lavrenov.io
    ```
1. You need to have Docker & Node installed on your computer.
1. Clone the repository
1. Start the server and nginx proxy using
    ```sh
    docker compose up
    ```
1. Open a terminal, and go to the 'client' folder. 
1. Perform a GET request using
    ```sh
    node client.js
    ```
This will start the server and the nginx proxy


