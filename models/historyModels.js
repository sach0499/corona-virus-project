const mongoose = require("mongoose");
const {stateSchema} = require('./stateModels')

const historySchema = new mongoose.Schema({

      createdOn: {
          type: String,
          required: true
      },

      data: {

        aggregatedData: {

            totalStates: {
                type: Number,
                default: 0
            },
            activeCases: {
                type: Number,
                default: 0
            },
           
            totalCured: {
                type: Number,
                default: 0
            },
            totalDeaths: {
                type: Number,
                default: 0
            }
          
      },

      stateWiseList : [stateSchema]
      }
});

const History = mongoose.model("History", historySchema);



module.exports = History;
