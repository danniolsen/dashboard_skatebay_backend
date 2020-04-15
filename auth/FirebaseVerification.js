"use-strict";
const admin = require("firebase-admin");

const VerifyIdToken = idToken => {
  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
};

module.exports = VerifyIdToken;
