module.exports = function USDValueFrom(
  BitCloutPrice,
  creatorCoinCirculated,
  creatorCoinHeld
) {
  return range(
    getUSDLocked(creatorCoinCirculated, BitCloutPrice),
    coin_supply2coin_price(
      creatorCoinCirculated - creatorCoinHeld,
      BitCloutPrice
    ),
    BitCloutPrice
  );
};

// usd locked = 0.001 * supply**3
function getUSDLocked(creatorCoinCirculated, BitCloutPrice) {
  return 0.001 * creatorCoinCirculated ** 3 * BitCloutPrice;
}
// return currentCreatorCoinPrice in USD
function coin_supply2coin_price(creatorCoinCirculated, BitCloutPrice) {
  return BitCloutPrice * (0.003 * creatorCoinCirculated ** 2);
}

function range(usd_locked, input_value, BitCloutPrice) {
  let expected_supply =
    (10 * Math.sqrt(10 / 3) * Math.sqrt(input_value)) /
    Math.sqrt(BitCloutPrice);
  let expected_usd_locked = 0.001 * expected_supply ** 3 * BitCloutPrice;
  return usd_locked - expected_usd_locked;
}
