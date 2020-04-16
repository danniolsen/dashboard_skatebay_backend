"use-strict";
const { GetModerationSpots } = require("../requests/moderationRequests.get");

const ModerationGet = (app, admin, clientData) => {
  // get list of moderation reports on spots
  app.post("/moderationspots", async (req, res) => {
    const { page } = req.body;
    const idToken = req.header("authorization");
    const query = await GetModerationSpots(page);
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
};

module.exports = ModerationGet;
