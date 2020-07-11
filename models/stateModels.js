const mongoose = require("mongoose");

exports.stateSchema = new mongoose.Schema({

  stateName: {
    type: String,
    required: true
    //,unique: true
  },

  activeCases: {
    type: Number,
    default: 0
  },
  // totalActiveCases: {
  //   type: Number,
  //   default: 0
  // },
  totalCured: {
    type: Number,
    default: 0
  },
  totalDeaths: {
    type: Number,
    default: 0
  }
});


//console.log(exports.stateSchema)


exports.State = mongoose.model("State", exports.stateSchema);
