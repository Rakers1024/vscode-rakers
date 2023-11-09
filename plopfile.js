const commandGenerator = require("./plop/command");

module.exports = function (plop) {
  plop.setGenerator("command", commandGenerator);
};
