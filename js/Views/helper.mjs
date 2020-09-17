// helper functions start here

const formatDate = (string) => {
  // const splitArray = string.split(/-/g);
  // // const label = splitArray[1].replace(" ", "");

  const date = string.split('-');

  const monthList = [

      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
  ]

  string = `${date[0]} ${monthList[parseInt(date[1]) - 1]}`;

  return string;
};

export const processHistories = (histories) => {
  const labels = [];
  const activeCasesList = [];
  const totalCuredList = [];
  const totalDeathsList = [];

  // first we will process the first element

  histories.forEach((element, index) => {
    const label = formatDate(element.createdOn);
    labels[histories.length - index - 1] = label;
    activeCasesList[histories.length - index - 1] =
      element.aggregateData.totalActive;
    totalCuredList[histories.length - index - 1] =
      element.aggregateData.totalRecovered;
    totalDeathsList[histories.length - index - 1] =
      element.aggregateData.totalDeaths;
  });

  return {
    labels,
    activeCasesList,
    totalCuredList,
    totalDeathsList,
  };
};

const createRow = (state, serialNo) => {
  const row = `<tr class="row-${serialNo}">
            <th>${serialNo}</th>
               <th>${state.name}</th>
               <th>${state.totalActive.toLocaleString()}</th>
               <th>${state.totalRecovered.toLocaleString()}</th>
             <th>${state.totalDeaths.toLocaleString()}</th>
           </tr>`;

  return row;
};

export const createTableBody = (statesData) => {

  let html ='';
  if (statesData) {
    statesData.forEach((el, index) => {
      html += createRow(statesData[index], index + 1);
    });
  } else {
    for (let index = 0; index < 25; index++) {
      html += createRow(
        { name: " ", totalActive: "", totalRecovered: "", totalDeaths: "" },
       ''
      );
    }
  }

  return html;
};
