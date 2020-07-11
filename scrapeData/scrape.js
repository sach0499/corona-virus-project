const fs = require("fs");
const request = require("request");
const rp = require("request-promise");
const cheerio = require("cheerio");

const options = {
  method: "GET",
  uri: "https://www.mohfw.gov.in/",
};

const parser = (html) => {
  const $ = cheerio.load(html);

  let stateNames = [];
  let activeCases = [];
  let curedCases = [];
  let deaths = [];

  let statesData = [];

  class SingleStateData {
    constructor(
      //  num,
      stateName,
      activeCases,
      totalCured,
      totalDeaths
    ) {
      // this.num = num;
      this.stateName = stateName;
      this.activeCases = activeCases;
      this.totalCured = totalCured;
      this.totalDeaths = totalDeaths;
    }
  }

  $(".data-table .table tbody tr td").each((index, element) => {
    const item = $(element).text().trim();

    if (index < 210) {
      switch (index % 6) {
        case 1:
          stateNames.push(item);
          break;
        case 2:
          activeCases.push(parseInt(item));
          break;
        case 3:
          curedCases.push(parseInt(item));
          break;
        case 4:
          deaths.push(parseInt(item));
          break;
      }
    }
  });

  stateNames.forEach((el, index) => {
    statesData.push(
      new SingleStateData(
        stateNames[index],
        activeCases[index],
        curedCases[index],
        deaths[index]
      )
    );
  });

  return statesData;
};

const getParsedData = async () => {
  return await rp(options).then((body) => parser(body));
};


module.exports = getParsedData;
