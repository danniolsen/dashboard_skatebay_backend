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
    const { interval, idToken } = req.body;
    const client = new Client(clientData);
    client.connect();
    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (!success) {
        client.end();
      }
    });

    let query = await GetAvgUserByInterval(interval);
    return client
      .query(query)
      .then(result => {
        res.status(200).json(result.rows);
        client.end();
      })
      .catch(e => {
        res.status(400).json([]);
        client.end();
      });
  });

  // count users by auth provider. google / facebook
  app.post("/getusersbyprovider", async (req, res) => {
    const { idToken } = req.body;
    const client = new Client(clientData);
    client.connect();
    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (!success) {
        client.end();
      }
    });

    let query = await GetUserByProvider();

    return client
      .query(query)
      .then(result => {
        res.status(200).json(result.rows);
        client.end();
      })
      .catch(e => {
        res.status(400).json([]);
        client.end();
      });
  });
};

module.exports = Users;
