"use-strict";
/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const UpdateModeratedSpot = spot_id => {
  const query = {
    name: "",
    text: ``,
    values: [spot_id]
  };
  return query;
};

const IgnoreModeration = moderation_id => {
  const query = {
    name: "",
    text: ``,
    values: [moderation_id]
  };
  return query;
};

module.exports = {
  GetModeration,
  IgnoreModeration
};
