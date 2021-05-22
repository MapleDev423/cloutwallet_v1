function btcltConversion(btclt) {
  return Number(btclt) / 1000000000;
}

function btcltToUsd(btclt, btcltPrice) {
  const removeDollarSign = btcltPrice.substring(btcltPrice.indexOf("$") + 1);
  const trimToNumber = removeDollarSign.substring(
    0,
    removeDollarSign.indexOf(" ")
  );

  const unitBtclt = btcltConversion(btclt);
  return unitBtclt * Number(trimToNumber);
}
http: export { btcltToUsd, btcltConversion };
