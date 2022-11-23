module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.(scss|css)": "stylelint --fix",
  "**/*.ts?(x)": "eslint --fix",
};
