"use-strict";
const {
  TotalSpotsCount,
  NewSpotsByTime,
  TotalUsersCount,
  PendingSpots
} = require("../requests/spotsRequests");
const VerifyIdToken = require("../../../auth/FirebaseVerification");

const Spots = (app, admin, clientData) => {
  // count total spots
  app.post("/counttotalspots", async (req, res, next) => {
    const idToken = req.header("authorization");
    const query = await TotalSpotsCount();
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
          response.msg = "Success";
          res.status(200).json(response);
          client.end();
        })
        .catch(e => {
          response.msg = "Something went wrong";
          res.status(400).json(response);
          client.end;
        });
    };
  });

  // count new spots by time interval
  app.post("/countspotsbyinterval", async (req, res) => {
    const idToken = req.header("authorization");
    const { interval } = req.body;
    const query = await NewSpotsByTime(interval);
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
          response.msg = "Success";
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

  // get avrage amount of spots posted by users
  app.post("/avgspotsbyusers", async (req, res) => {
    const idToken = req.header("authorization");
    const query = await TotalUsersCount();
    const client = new Client(clientData);
    client.connect();

    let response = { data: 0, msg: "" };
    try {
      const verifiedToken = VerifyIdToken(idToken).then(success => {
        if (success) {
          doRequest(query);
        } else {
          response.msg = "Token not accepted";
          res.status(400).json(response);
        }
      });
    } catch (err) {
      response.msg = "Token missing";
      res.status(400).json(response);
    }

    const doRequest = async query => {
      const countSpots = await TotalSpotsCount();
      return client
        .query(query)
        .then(result => {
          client
            .query(countSpots)
            .then(spotRes => {
              let avg = spotRes.rows[0].totalspots / result.rows[0].totalusers;
              response.data = avg;
              response.msg = "Success";
              res.status(200).json(response);
              client.end();
            })
            .catch(err => {
              res.status(400).json([]);
            });
        })
        .catch(e => {
          res.status(400).json([]);
          client.end();
        });
    };
  });

  // get all pending spots

  app.post("/pendingspots", async (req, res) => {
    const idToken = req.header("authorization");
    const query = await PendingSpots();
    const client = new Client(clientData);
    client.connect();

    let response = { data: [], msg: "" };

    try {
      const verifiedToken = VerifyIdToken(idToken).then(success => {
        if (success) {
          doRequest(query);
        } else {
          response.msg = "Token not accepted";
          res.status(400).json(response);
        }
      });
    } catch (err) {
      response.msg = "Token missing";
      res.status(400).json(response);
    }

    const doRequest = query => {
      return client
        .query(query)
        .then(result => {
          response.data = result.rows;
          response.msg = "Success";
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
}; // route function ends

module.exports = Spots;
