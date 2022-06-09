const axios = require('axios');
const https = require('https');
const fs = require('fs');

const hostNamesArray = ['localhost', 'mssl.lavrenov.io', 'mssl.crystalspring.dev']

const getRequestWithCertificate = async () => {
  try {
    const cert = fs.readFileSync("../nginx/certs/local/client.crt");
    const key = fs.readFileSync("../nginx/certs/local/client.key");
    // const hostName = "127.0.0.1";
    const hostName = hostNamesArray[1];
    const httpsAgent = new https.Agent({
      cert,
      key,
      rejectUnauthorized: false,
    });

    const response = await axios.get(`https://${hostName}`, {
      httpsAgent,
    });
    console.log(response.data);
  } catch (e) {
    const error = e;
    if (!axios.isAxiosError(error)) {
      console.log("native error");
      // when it throws native error
      console.log(error);
    } else {
      // when it throws axios error
      if (error.request) {
        console.log("request error");
        console.log(error.request);
        //when requested but there is no response from server
      }
      if (error.response) {
        console.log("response error");
        // the request was made and server responsed tiwh a status code
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }
};

setTimeout(() => {
  getRequestWithCertificate();
}, 1000);