"use-strict";
/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const TotalSpotsCount = () => {
  const query = {
    name: "count-total-number-of-spots",
    text: `SELECT COUNT(spot_id) as totalSpots from spots`,
    values: []
  };
  return query;
};

const NewSpotsByTime = interval => {
  const query = {
    name: "count-new-spots-by-interval",
    text: `select spot_created_at::DATE as by_day, COUNT(spot_id) from spots
    WHERE "spot_created_at" > (CURRENT_DATE - INTERVAL '${interval} days')
    group by by_day;`,
    values: []
  };
  return query;
};

const TotalUsersCount = () => {
  const query = {
    name: "count-all-users",
    text: `SELECT COUNT(user_id) as totalUsers from users`,
    values: []
  };
  return query;
};

const PendingSpots = () => {
  const query = {
    name: "get-pending-spots",
    text: `SELECT * FROM spots WHERE pending = true`,
    values: []
  };
  return query;
};

module.exports = {
  TotalSpotsCount,
  NewSpotsByTime,
  TotalUsersCount,
  PendingSpots
};
