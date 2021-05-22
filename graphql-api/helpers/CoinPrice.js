module.exports = function CoinPrice(CoinsInCirculationBitClout, USDValue) {
  return (
    0.003 * (CoinsInCirculationBitClout * CoinsInCirculationBitClout) * USDValue
  );
};
