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

  let headingArray = [];
  let valuesArray = [];
  let i = 0;
  let j = 0;
  let stateNames = [];
  let totalCases = [];
  let totalCured = [];
  let totalDeaths = [];
  let statesData = [];

  class SingleStateData {
    constructor(
      //  num,
      stateName,
      totalCases,
      totalCured,
      totalDeaths
    ) {
      // this.num = num;
      this.stateName = stateName;
      this.totalCases = totalCases;
      this.totalCured = totalCured;
      this.totalDeaths = totalDeaths;
    }
  }

  $("thead tr th").each((index, element) => {
    const item = $(element).text().trim();
    if (index > 3) {
      headingArray[index - 4] = item;
    }
  });
  $("tbody tr td").each((index, element) => {
    const item = $(element).text();
    const newIndex = index % 5;
    if (
      i ||
      item == "Andaman and Nicobar Islands" ||
      item == "Andhra Pradesh"
    ) {
      // This should be at the top of this if block
      if (j || item == "West Bengal") {
        if (j === 5) {
          return;
        }
        j++;
      }
      switch (i % 5) {
        case 0:
          stateNames.push(item);
          break;
        case 1:
          totalCases.push(parseInt(item));
          break;
        case 2:
          totalCured.push(parseInt(item));
          break;
        case 3:
          totalDeaths.push(parseInt(item));
          break;
      }
      i++;
    }
  });
  stateNames.forEach((element, index) => {
    statesData[index] = new SingleStateData(
      //  (index+1),
      stateNames[index],
      totalCases[index],
      totalCured[index],
      totalDeaths[index]
    );
  });

  return statesData;
};

const getParsedData = async () => {
  return await rp(options).then((body) => parser(body));
};

module.exports = getParsedData;
