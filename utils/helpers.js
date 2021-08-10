module.exports = {
  //For debuging values sent to handlebars
  debug: (optionalValue) => {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }
  },
  formatDate: (date) => {
    let dateFormat = date.split("-");
    return dateFormat[1] + "/" + dateFormat[2] + "/" + dateFormat[0];
  },
  // adding format date helper
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
};
