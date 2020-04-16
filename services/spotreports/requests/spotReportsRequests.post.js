"use-strict";
/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const ResolveSpotReport = spot_id => {
  const query = {
    name: "resolve-spot-report",
    text: `select * from reports`,
    values: [spot_id]
  };
  return query;
};

module.exports = {
  ResolveSpotReport
};
