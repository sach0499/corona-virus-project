// this will provide two functions that import the statesdata and history data

// /api/v1/history
// /api/v1/states?sort=something

export const getStatesData = async (sortProperty = "stateName") => {
  const endpoint = `/api/v1/states?sort=${sortProperty}`;
  
  try {
    const response = await (
      await fetch(endpoint, {
        method: "GET",
      })
    ).json();

    const data = response.data.stateWiseList;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getHistories = async () => {
  const endpoint = "/api/v1/history";
  try {
    const response = await (
      await fetch(endpoint, {
        method: "GET",
      })
    ).json();

    const data = response.data.history;

    return data;
  } catch (err) {
    console.log(err);
  }
};


