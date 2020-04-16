"use-strict";
/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const GetModerationSpots = page => {
  const query = {
    name: "",
    text: `select * from reports where resolved = false order by created_at desc limit 10`,
    values: []
  };
  return query;
};

module.exports = {
  GetModerationSpots
};
