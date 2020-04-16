"use-strict";
const { ResolveSpotReport } = require("../requests/spotReportsRequests.update");
const VerifyIdToken = require("../../helpers/FirebaseVerification");

const SpotReportsUpdate = (app, clientData, Client) => {
  // get list of spot reports
  app.post("/resolvespotsreport", async (req, res) => {
    const idToken = req.header("authorization");
    const { report_id } = req.body;
    const queryUpdateReports = await ResolveSpotReport(report_id);
    const client = new Client(clientData);
    client.connect();

    let response = { msg: "" };

    const verifiedToken = VerifyIdToken(idToken).then(success => {
      if (success) {
        doRequest(queryUpdateReports);
      } else {
        response.msg = "Token not accepted";
        res.status(400).json(response);
      }
    });

    const doRequest = queryUpdateReports => {
      return client
        .query(queryUpdateReports)
        .then(result => {
          response.msg = "Report has been resolved";
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

module.exports = SpotReportsUpdate;
