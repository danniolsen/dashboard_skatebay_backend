"use-strict";
const client = require("../../../server/db");
const { Client } = require("pg");
const {
  TotalSpotsCount,
  NewSpotsByTime,
  TotalUsersCount
} = require("../requests/spotsRequests");
const VerifyIdToken = require("../../../auth/FirebaseVerification");

const Spots = (app, admin, clientData) => {
  // count total spots
  app.post("/counttotalspots", async (req, res) => {
    const { idToken } = req.body;
    const client = new Client(clientData);
    client.connect();
    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (!success) {
        client.end();
      }
    });

    const query = await TotalSpotsCount();
    return client
      .query(query)
      .then(result => {
        res.status(200).json(result.rows);
        client.end();
      })
      .catch(e => {
        res.status(400).json([]);
        client.end;
      });
  });

  // count new spots by time interval
  app.post("/countspotsbyinterval", async (req, res) => {
    const { interval, idToken } = req.body;
    const client = new Client(clientData);
    client.connect();
    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (!success) {
        client.end();
      }
    });
    const query = await NewSpotsByTime(interval);
    return client
      .query(query)
      .then(result => {
        res.status(200).json(result.rows);
        client.end();
      })
      .catch(e => {
        res.status(400).json([]);
        client.end;
      });
  });

  // get avrage amount of spots posted by users
  app.post("/avgspotsbyusers", async (req, res) => {
    const { idToken } = req.body;
    const client = new Client(clientData);
    client.connect();
    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (!success) {
        client.end();
      }
    });

    const countUsers = await TotalUsersCount();
    const countSpots = await TotalSpotsCount();

    return client
      .query(countUsers)
      .then(result => {
        client
          .query(countSpots)
          .then(spotRes => {
            let avg = spotRes.rows[0].totalspots / result.rows[0].totalusers;
            res.status(200).json({ avg: avg });
            client.end();
          })
          .catch(err => {
            res.status(400).json([]);
          });
      })
      .catch(e => {
        res.status(400).json([]);
        client.end;
      });
  });
};

module.exports = Spots;
