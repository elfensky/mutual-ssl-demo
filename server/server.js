const express = require('express')
const cors = require('cors');

const port = 4000;
const host = "0.0.0.0";
const app = express();

app.use(cors());
app.use('/favicon.ico', express.static('favicon/favicon.ico'));

app.get("/", (req, res, next) => {
  if(req.headers['x-forwarded-proto'] === 'https' ) {  // req.headers['x-forwarded-for'] === 'mssl.crystalspring.dev' && 
    res.status(200).json({
      message: "Successfully accessed over mutual TLS",
    });
  } else {
    res.status(200).json({
      message: "Accessed over http",
    });
  }
});

app.listen(port, host, () => {
  console.log(`Server is listening on ${host}:${port}`);
});