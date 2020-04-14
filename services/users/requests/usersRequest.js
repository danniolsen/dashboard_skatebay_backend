"use-strict";

/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const GetAvgUserByInterval = (interval, type) => {
  const query = {
    name: "get-avg-user-number-per-days",
    text: `select created_at::DATE as by_day, COUNT(user_id) from users
    WHERE "created_at" > (CURRENT_DATE - INTERVAL '${interval} days')
    group by by_day;`,
    values: []
  };
  return query;
};

const GetUserByProvider = () => {
  const query = {
    name: "get-users-by-provider",
    text: `select count(user_id), provider from users group by provider;`,
    values: []
  };
  return query;
};

module.exports = {
  GetAvgUserByInterval,
  GetUserByProvider
};
