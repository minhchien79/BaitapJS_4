function Validation() {
  this.kiemTraRong = function (value, spanID, message) {
    if (value === "") {
      getEle(spanID).innerHTML = message;
      getEle(spanID).style.display = "block";
      return false;
    }
    getEle(spanID).innerHTML = "";
    getEle(spanID).style.display = "none";
    return true;
  };
}
