module.exports = function bitCloutUSD(satoshi, USD) {
  return ((USD / 100) * satoshi) / 1000000;
};
