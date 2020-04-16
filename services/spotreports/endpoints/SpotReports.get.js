"use-strict";
const { GetSpotReports } = require("../requests/spotReportsRequests.get");
const VerifyIdToken = require("../../helpers/FirebaseVerification");

const SpotReportsGet = (app, admin, clientData, Client) => {
  // get list of spot reports
  app.post("/spotreports", async (req, res) => {
    const { page } = req.body;
    const idToken = req.header("authorization");
    const queryGetReports = await GetSpotReports(page);
    const client = new Client(clientData);
    client.connect();

    let response = { data: [], msg: "" };

    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (success) {
        doRequest(queryGetReports);
      } else {
        response.msg = "Token not accepted";
        res.status(400).json(response);
      }
    });

    const doRequest = queryGetReports => {
      return client
        .query(queryGetReports)
        .then(result => {
          response.data = result.rows;
          response.msg = "Success";
          res.status(200).json(result.rows);
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

module.exports = SpotReportsGet;
