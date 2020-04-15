"use-strict";
const admin = require("firebase-admin");

const VerifyIdToken = idToken => {
  if (idToken === undefined) {
    return false;
  } else {
    let token = idToken.replace("Bearer ", "");
    return admin
      .auth()
      .verifyIdToken(token)
      .then(function(decodedToken) {
        return true;
      })
      .catch(function(error) {
        return false;
      });
  }
};

module.exports = VerifyIdToken;
