import * as model from "./Models/models.mjs";
import * as view from "./Views/view.mjs";
import domElements from "./domElements.mjs";

const sortTable = async (event) => {
  const sortProperty = event.target.value;
  view.clearTable();
  const stateWiseList = await model.getStatesData(sortProperty);
  view.renderTables(stateWiseList);
};

const render = async () => {
  try {
    const stateWiseList = await model.getStatesData();
    const histories = await model.getHistories();

    view.renderTopStuff(histories[0]);
    view.renderGraphs(histories);
    view.renderTables(stateWiseList);
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("load", (event) => {
  render();
});

domElements.sortForm.addEventListener("change", sortTable);
