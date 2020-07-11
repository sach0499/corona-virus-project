const History = require("./../models/historyModels");

exports.getAllHistory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const history = await History.find({})
      .select("-data.stateWiseList")
      .sort([["_id", -1]])
      .limit(limit)
      .select("-_id");

    res.status(200).json({
      status: "success",
      data: {
        history: history,
      },
    });
  } catch (err) {
    next(err);
  }
};
