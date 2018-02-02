module.exports = {
  capitalize: function(s) {
    return s[0].toUpperCase() + s.slice(1);
  },
  capitalizeAll: function(s) {
    return s[0].toUpperCase() + s.slice(2);
  }
}

/*
const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
}

*/
