"use-strict";
/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const GetSpotReports = page => {
  console.log(page);
  const query = {
    name: "get-spot-reports",
    text: `select * from reports`,
    values: []
  };
  return query;
};

module.exports = {
  GetSpotReports
};
