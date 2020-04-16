const Users = require("./users/endpoints/usersEndpoint");
const Spots = require("./spots/endpoints/spotsEndpoint");
const SpotReportsGet = require("./spotreports/endpoints/SpotReports.get");
const SpotsDelete = require("./spots/endpoints/spotEndpoint.delete");
const SpotReportsUpdate = require("./spotreports/endpoints/SpotReports.update");

module.exports = {
  Users,
  Spots,
  SpotReportsGet,
  SpotsDelete,
  SpotReportsUpdate
};
