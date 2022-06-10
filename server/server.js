const express = require('express')
const cors = require('cors');

const port = 4000;
const host = "0.0.0.0";
const app = express();

app.use(cors());
app.use('/favicon.ico', express.static('favicon/favicon.ico'));

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "These are the possible endpoints",
    endpoints: ['/http','/https','/mssl']
  });
});

app.get("/http", (req, res, next) => {
  res.status(200).json({
    message: "Accessed over http",
    mssl: false
  });
});

app.get("/https", (req, res, next) => {
  if(req.headers['x-forwarded-proto'] === 'https' ) {  // req.headers['x-forwarded-for'] === 'mssl.crystalspring.dev' && 
    res.status(200).json({
      message: "Accessed over https",
      mssl: false
    });
  } else {
    res.status(403).json({
      message: "Tried accessing https over http",
      mssl: false
    });
  }

  console.log({
    SSL_Client_Issuer: req.headers['SSL_Client_Issuer'],
    SSL_Client_Verify: req.headers['SSL_Client_Verify'],
    SSL_Client: req.headers['SSL_Client']
  })
});

app.get("/mssl", (req, res, next) => {
  res.status(200).json({
    message: "Accessed over https + mssl",
    mssl: true
  });
  console.log({
    SSL_Client_Issuer: req.headers['SSL_Client_Issuer'],
    SSL_Client_Verify: req.headers['SSL_Client_Verify'],
    SSL_Client: req.headers['SSL_Client']
  })

  // if(req.headers['SSL_Client_Verify'] === 'SUCCESS' ) {  // req.headers['x-forwarded-for'] === 'mssl.crystalspring.dev' && 
  //   res.status(200).json({
  //     message: "Accessed over https + mssl",
  //     mssl: true
  //   });
  // } else {
  //   res.status(403).json({
  //     message: "Tried accessing mSSL without Client Authentication",
  //     mssl: false
  //   });
  // }
});


app.listen(port, host, () => {
  console.log(`Server is listening on ${host}:${port}`);
});