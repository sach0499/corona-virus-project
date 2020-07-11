const { State } = require("./../models/stateModels");

exports.getAllStates = async (req, res) => {

  console.log("It reached here.")
  try {
    const states = await State.find({}).select("-_id").sort(req.query.sort);

    res.status(200).json({
      status: "success",
      data: {
        stateWiseList: states,
      },
    });
  } catch (err) {
    console.log("It went at catch.")
    res.status(404).json({
      status: "failure",
      message: err,
    });
  }
};
