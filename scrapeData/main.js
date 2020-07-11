const fs = require("fs");
const moment = require("moment");
const mongoose = require("mongoose");
//const dotenv = require("dotenv");
const pullStateInput = require("./scrape");
const { State } = require("../models/stateModels");
const History = require("../models/historyModels");

//dotenv.config({ path: "./config.env" });

const formatDate = (string) => {
  const splitArray = string.split(/,/g);
  const label = splitArray[1].replace(" ", "");

  return label;
};

const shouldWeUpdateDB = (previousInputs, aggregatedData) => {
  // previous input consist of last two documents in history collection

  // 0.) this checks whether the db is small

  const isDbSamll = previousInputs.length != 2;

 
  if (isDbSamll) {
    return true;
  }

  // 1.) Second it checks whether we have updated the database 2 times
  // already and whether the current date is when we have updated the db

  const timeStamps = [
    formatDate(previousInputs[0].createdOn),
    formatDate(previousInputs[1].createdOn),
    formatDate(moment().format("LLLL")),
  ];


  if (timeStamps[0] === timeStamps[1] && timeStamps[1] === timeStamps[2]) {
    return false;
  }

 

  // 2.) Check whether the updated data is different
  const data = previousInputs[0].data.aggregatedData;
  const isDataUpdated = !(
    data.activeCases === aggregatedData.activeCases ||
    data.totalCured === aggregatedData.totalCured ||
    data.totalDeaths === aggregatedData.totalDeaths
  );

  if (!isDataUpdated) {
    return false;
  }

  return true;
};




const updateDB = async () => {
  try {
    const aggregatedData = {
      totalStates: 0,
      activeCases: 0,
      totalCured: 0,
      totalDeaths: 0,
    };
    const stateInput = await pullStateInput();

    stateInput.forEach((value, index) => {
      aggregatedData.totalStates += 1;
      aggregatedData.activeCases += value.activeCases;
      aggregatedData.totalCured += value.totalCured;
      aggregatedData.totalDeaths += value.totalDeaths;
    });

    


    const previousInputs = await History.find().sort({ $natural: -1 }).limit(2);

    //  we would always not want to update the db
    if (shouldWeUpdateDB(previousInputs, aggregatedData)) {
    
      const historyInput = {
        createdOn: moment().format("LLLL"),
        data: {
          aggregatedData: aggregatedData,
          stateWiseList: stateInput,
        },
      };

      await History.create(historyInput);
      await State.deleteMany({});
      await State.create(stateInput);

      console.log(`DB Successully updated at ${moment().format("LLLL")}`);
    }
  } catch (err) {
    console.log(err);
  }

  // process.exit();
};

//updateDB();

module.exports = updateDB;
