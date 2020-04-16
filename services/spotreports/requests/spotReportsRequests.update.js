"use-strict";
/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/
const ResolveSpotReport = report_id => {
  const query = {
    name: "resolve-spot-report",
    text: `UPDATE reports SET resolved = true WHERE report_id = $1`,
    values: [report_id]
  };
  return query;
};

module.exports = {
  ResolveSpotReport
};
