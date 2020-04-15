"use-strict";
const client = require("../../../server/db");
const { Client } = require("pg");
const {
  GetAvgUserByInterval,
  GetUserByProvider
} = require("../requests/usersRequest");
const VerifyIdToken = require("../../../auth/FirebaseVerification");

const Users = (app, admin, clientData) => {
  // count new users by time periode interval in days

  app.post("/getusers", async (req, res) => {
    const idToken = req.header("authorization");
    const { interval } = req.body;
    const query = await GetAvgUserByInterval(interval);
    const client = new Client(clientData);
    client.connect();

    let response = { data: [], msg: "" };

    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (success) {
        doRequest(query);
      } else {
        response.msg = "Token not accepted";
        res.status(400).json(response);
      }
    });

    const doRequest = query => {
      return client
        .query(query)
        .then(result => {
          response.data = result.rows;
          res.status(200).json(response);
          client.end();
        })
        .catch(e => {
          response.msg = "Something went wrong";
          res.status(400).json(response);
          client.end();
        });
    };
  });

  // count users by auth provider. google / facebook
  app.post("/getusersbyprovider", async (req, res) => {
    const idToken = req.header("authorization");
    let query = await GetUserByProvider();
    const client = new Client(clientData);
    client.connect();

    let response = { data: [], msg: "" };

    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (success) {
        doRequest(query);
      } else {
        response.msg = "Token not accepted";
        res.status(400).json(response);
      }
    });

    const doRequest = query => {
      return client
        .query(query)
        .then(result => {
          response.data = result.rows;
          res.status(200).json(response);
          client.end();
        })
        .catch(e => {
          response.msg = "Something went wrong";
          res.status(400).json(response);
          client.end();
        });
    };
  });
};

module.exports = Users;
