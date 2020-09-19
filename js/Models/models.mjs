// this will provide two functions that import the statesdata and history data

export const getStatesData = async (sortProperty = "name") => {
  const endpoint = `https://covindappbackend.herokuapp.com/api/v1/states?sort=${sortProperty}`;

  try {
    const response = await (
      await fetch(endpoint, {
        method: "GET",
      })
    ).json();

    const data = response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getHistories = async () => {
  const endpoint = "https://covindappbackend.herokuapp.com/api/v1/histories";
  try {
    const response = await (
      await fetch(endpoint, {
        method: "GET",
      })
    ).json();

    const data = response.data;


    return data;
  } catch (err) {
    console.log(err);
  }
};
