"use strict";
require("../common/vendor.js");
function timeExChange() {
  var date = /* @__PURE__ */ new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var next = date.getDate();
  next = next + 1;
  var hour = date.getHours();
  var minute = date.getMinutes() - 0;
  var second = date.getSeconds();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if (next < 10) {
    next = `0${next}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  var time = year + "-" + month + "-" + addZero(day) + " " + addZero(hour) + ":" + addZero(minute) + ":" + addZero(
    second
  );
  var mmmmyydd = year + "-" + month + "-" + day;
  var nextday = year + "-" + month + "-" + next;
  let GMT = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    time,
    mmmmyydd,
    nextday
  };
  return GMT;
}
function addZero(s) {
  return s < 10 ? "0" + s : s;
}
exports.timeExChange = timeExChange;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/method.js.map
