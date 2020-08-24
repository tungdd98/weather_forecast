// import SCSS
import "../sass/main.scss";

import TreeID3 from "./modules/id3.js";
import DATA from "./mocks/tranning.js";
import APP from "./modules/app.js";

const demo = new TreeID3(DATA.data, DATA.attrs, DATA.target);
demo.getTree();
APP.loadDataTable(DATA);

// const demo2 = new TreeID3(DATA2.data, DATA2.attrs, DATA2.target)
// demo2.getTree()

window.onload = () => {
  setInterval(() => {
    APP.getDateTime();
  }, 1000);
  APP.init("start", "", demo);

  APP.fn("#id3-search").addEventListener("keyup", () => {
    let value = event.target.value.trim();
    let keyCode = event.keyCode;
    if (keyCode === 13) {
      APP.init("", value, demo);
    }
  });

  APP.fn("#btn-thuattoan").addEventListener("click", function () {
    if (APP.fn("#modal-thuattoan").classList.contains("show")) {
      APP.fn("#modal-thuattoan").classList.remove("show");
    } else {
      APP.fn("#modal-thuattoan").classList.add("show");
    }

    APP.fn("#modal-thuattoan .w-modal-content").innerHTML = demo.solution;
  });

  APP.fn("#btn-cancel-thuattoan").addEventListener("click", function () {
    if (APP.fn("#modal-thuattoan").classList.contains("show")) {
      APP.fn("#modal-thuattoan").classList.remove("show");
    } else {
      APP.fn("#modal-thuattoan").classList.add("show");
    }
  });

  APP.fn("#btn-dubao").addEventListener("click", function () {
    APP.getInputField(demo);
  });
};
