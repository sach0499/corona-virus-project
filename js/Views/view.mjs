import domElements from "../domElements.mjs";
import makeAreaCharts from "./chart.mjs";
import * as helper from "./helper.mjs";

// helper functions end here

export const renderTopStuff = async (history) => {
  try {
    const recentHistory = history.aggregateData;
    // const timeStamp = history.createdOn;
    // domElements.timeStampInfo.innerText = `( last updated on ${timeStamp}. Also includes foreign nationals. )`;

    domElements.activeNumbers.innerText = recentHistory.totalActive.toLocaleString();
    domElements.curedNumbers.innerText = recentHistory.totalRecovered.toLocaleString();
    domElements.deathNumbers.innerText = recentHistory.totalDeaths.toLocaleString();
    domElements.migratedNumbers.innerText = 1;
  } catch (err) {
    console.log(err);
  }
};

export const renderGraphs = async (histories) => {
  // Since data is date wise list this helper
  // function processes data so that all same
  // key values are in the same array

  const data = helper.processHistories(histories);


  // this is a helper function that draws the area charts
  // parameters to it are the chart canvas id, labels for x-axis
  // labels for y-axis, color of line and name of the chart
  makeAreaCharts(
    "activeCasesChart",
    data.labels,
    data.activeCasesList,
    "rgba(78, 115, 223, 1)",
    "Active Corona Cases: "
  );
  makeAreaCharts(
    "curedCasesChart",
    data.labels,
    data.totalCuredList,
    "rgba(28, 200, 138, 1)",
    "Cured Cases: "
  );
  makeAreaCharts(
    "deceasedCasesChart",
    data.labels,
    data.totalDeathsList,
    "rgba(231, 74, 59, 1)",
    "Deceased Cases: "
  );
};

// export const clearElement = (domElement) => {

//       domElement.innerHTML = '';
// }

export const clearTable = () => {
  const html = helper.createTableBody();
  domElements.tableBody.innerHTML = html;
};

export const renderTables = (statesData) => {
  const html = helper.createTableBody(statesData);
  domElements.tableBody.innerHTML = html;
};
