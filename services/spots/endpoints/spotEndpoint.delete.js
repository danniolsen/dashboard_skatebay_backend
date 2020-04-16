"use-strict";
const { DeleteSpot } = require("../requests/spotsRequests");
const VerifyIdToken = require("../../helpers/FirebaseVerification");

const SpotsDelete = (app, clientData, Client) => {
  app.delete("/deletespot", async (req, res) => {
    const idToken = req.header("authorization");
    const { spot_id } = req.body;
    const query = await DeleteSpot(spot_id);
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
          response.msg = "Spot has been deleted";
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

module.exports = SpotsDelete;
