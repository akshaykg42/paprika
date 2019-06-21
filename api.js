const axios = require("axios");
const express = require("express");
const router = express.Router();
const state = {
    access_token: ""
};
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require("fs");

router.get("/", (req, res) => {
    res.json({
        "api_version": "1.0.0"
    });
})


router.get("/auth", (req, res) => {
    const code = req.query.code;
    console.log(code);

    let config = {
        headers: {
          Accept: "application/json",
        }
      }

    axios.post("https://github.com/login/oauth/access_token", {
        "client_id": "Iv1.ab929d25982c75d7",
        "client_secret": "effd0f79f2737a8b2a008b250c029860b36fc380",
        "code": code,
      }, config)
      .then(function (response) {
        console.log(response.data);
        res.json({"hello": ""+response.data});
      })
      .catch(function (error) {
        res.json(error);
        console.log(error);
      });

      
});

router.post('/upload', upload.single('example'), (req, res, next) => {
    const encoded = new Buffer(fs.readFileSync(req.file.path)).toString("base64")
    res.json(encoded);
    let payload = {
      "message": "File added using Paprika",
      "committer": {
        "name": "Tanay Vardhan",
        "email": "tvardha2@illinois.edu"
      },
      "content": encoded
    };
    let config = {
      headers: {
        Authorization: "token " + state.access_token,
      }
    }/*
    axios.post("https://github.com/login/oauth/access_token", {
        "client_id": "Iv1.ab929d25982c75d7",
        "client_secret": "effd0f79f2737a8b2a008b250c029860b36fc380",
        "code": code,
      }, config)
      .then(function (response) {
        console.log("Trimm", response.data.toString().substring(13,55));
        res.json({"hello": ""+response.data});
      })
      .catch(function (error) {
        res.json(error);
        console.log(error);
      });*/
  })


module.exports = router;