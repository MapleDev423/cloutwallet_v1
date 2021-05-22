const detectEthereumProvider = require("@metamask/detect-provider")
const Web3 = require("web3")
const BN = (x,y) => Web3.utils.toBN(x,y)
// I wish so much to put this in it's own file but browserify isn't cooperating with this idea and I don't have the time to know why.
const ABI ={"IUniswapV2Pair":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IUniswapV2Factory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"reserve0","type":"uint112"},{"internalType":"uint112","name":"reserve1","type":"uint112"},{"internalType":"uint32","name":"blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"IERC20":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"IUniswapV2Router01":[{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IWETH9","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tokenA","type":"address"},{"internalType":"contract IERC20","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IUniswapV2Factory","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tokenA","type":"address"},{"internalType":"contract IERC20","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tokenA","type":"address"},{"internalType":"contract IERC20","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"contract IERC20[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"}]}

const xxxAddr = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" // Here UNI, can put anything else in here
const WETHAddr = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" // WETH on mainnet
const pairAddr = "0xd3d2E2692501A5c9Ca623199D38826e513033a17" // Uniswap pair address
const routerAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" // Uniswap's router
const whichToken = BN(xxxAddr.slice(2),16).lt(BN(WETHAddr.slice(2),16)) // True if xxx is token0 of the pair
var selling = false // false = selling ETH and buying xxx, true = selling xxx and buying ETH
var xxx, WETH, pair, router, xxxDecimals, account
const MAXUINT256 = BN(2).pow(BN(256)).sub(BN(1))

const gid = x => document.getElementById(x)
const selectBuy = gid("swapper-selector-buy")
const selectSell = gid("swapper-selector-sell")
const inputsField = gid("swapper-inputs")
const inputFieldEth = gid("swapper-eth")
const inputFieldXxx = gid("swapper-xxx")
const balanceEth = gid("swapper-eth-balance")
const balanceXxx = gid("swapper-xxx-balance")
const amountEth = gid("swapper-eth-amount")
const amountXxx = gid("swapper-xxx-amount")
const inputEth = gid("swapper-eth-input")
const inputXxx = gid("swapper-xxx-input")
const connectToWallet = gid("swapper-metamask-activation")
const swapperBtns = gid("swapper-swapping-btns")
const swapBtn = gid("swapper-swap")
const inputSlippage = gid("swapper-slippage")

function flipSell() { // FLips what we sell
  selling = !selling

  if (selling) {
    // We are selling xxx for ETH
    // Enable buttons
    selectSell.disabled = true
    selectBuy.disabled = false

    // Reorder with ETH in last
    inputsField.removeChild(inputFieldEth)
    inputsField.appendChild(inputFieldEth)

    // Disable ETH balance, enable xxx one
    balanceEth.hidden = true
    balanceXxx.hidden = false

    // Set readOnly correctly
    inputEth.readOnly = true
    inputXxx.readOnly = false
  } else {
    // We are selling ETH for xxx
    // Enable buttons
    selectBuy.disabled = true
    selectSell.disabled = false

    // Reorder with xxx in last
    inputsField.removeChild(inputFieldXxx)
    inputsField.appendChild(inputFieldXxx)

    // Disable xxx balance, enable ETH one
    balanceXxx.hidden = true
    balanceEth.hidden = false

    // Set readOnly correctly
    inputXxx.readOnly = true
    inputEth.readOnly = false
  }

  // Update new pricings
  scheduleUpdate()
}
selectBuy.onclick = flipSell
selectSell.onclick = flipSell

function setMax() { // Max out the value to the balance
  if (selling) { // Are we selling some xxx
    // We need to max xxx
    inputXxx.value = amountXxx.innerText
  } else {
    // We need to max ETH
    inputEth.value = amountEth.innerText
  }
  scheduleUpdate() // Update balance
}
balanceEth.onclick = setMax
balanceXxx.onclick = setMax

connectToWallet.onclick = async () => { // Enable metamask
  connectToWallet.disabled = true
  await enableEthereum()
  connectToWallet.hidden = true
  connectToWallet.disabled = false // Return back the button to initial state just in case
  swapperBtns.hidden = false
}

let enabled = false // True once ETH has been enabled
let updating = 0 // 0 = not doing anything, 1 = executing an update, 2 = executing an update and a new is scheduled
function scheduleUpdate() { // Used to schedule an update of the pricings
  if (updating < 2) {
    updating++

    if (updating == 1) {
      setTimeout(update,1)
    }
  }
}

function convertBIGToStrForXxx(outputAmount) {
  let outputAmountStr = outputAmount.toString() // Stringify
  let decimals = (selling ? 18 : xxxDecimals.toNumber())
  let missings = decimals - outputAmountStr.length
  return missings < 0 ? outputAmountStr.slice(0, -decimals) + "." + outputAmountStr.slice(-decimals) : "0." + "0".repeat(missings) + outputAmountStr
}

async function calculateOutputs() {
  if (!web3) {
    throw "update attempted without any web3"
  }

  let inputAmount
  if (selling) { // Are we selling some xxx ?
    // Yes
    inputAmount = BN(web3.utils.toWei(inputXxx.value ? inputXxx.value : "0")).mul(BN(10).pow(xxxDecimals.sub(BN(18)))) // First use toWei to get a 18 decimated an addapt from there.
    amountXxx.innerText = convertBIGToStrForXxx(await xxx.methods.balanceOf(account).call())
  } else {
    // No
    inputAmount = BN(web3.utils.toWei(inputEth.value ? inputEth.value : "0")) // Fetch what the user amount
    amountEth.innerText = web3.utils.fromWei(await web3.eth.getBalance(account)) // Sets ballance
  }

  const toDo = selling == whichToken // Stores if we are buying ETH
  let r = await pair.methods.getReserves().call()
  let reserveIn = BN(toDo ? r[0] : r[1])
  let reserveOut = BN(toDo ? r[1] : r[0])
  let outputAmount = inputAmount.mul(BN(997)) // Calculate after fees
  outputAmount = outputAmount.mul(reserveOut).div(reserveIn.mul(BN(1000)).add(outputAmount)) // Calculate outputs

  outputAmountStr = convertBIGToStrForXxx(outputAmount)

  // Are we buying some ETH ?
  if (selling) inputEth.value = outputAmountStr
  else inputXxx.value = outputAmountStr
  return {inputAmount, outputAmount}
}

async function update() { // Update the pricings
  try {
    await calculateOutputs()
  } catch (e) {
    console.log("Error updating:", e)
  }

  if (updating > 0) {
    updating--
    if (updating == 1) {
      setTimeout(update,1)
    }
  }
}
inputXxx.onkeyup = scheduleUpdate
inputEth.onkeyup = scheduleUpdate

var enablingEth = false // Avoid concurrent enable process
var web3 // web3 usable object
async function enableEthereum() {
  if (enablingEth) return
  enablingEth = true

  try {
    provider = await detectEthereumProvider()
    await provider.enable()
    console.log(provider)
    web3 = new Web3(provider)

    xxx = new web3.eth.Contract(ABI["IERC20"], xxxAddr)
    WETH = new web3.eth.Contract(ABI["IERC20"], WETHAddr)
    pair = new web3.eth.Contract(ABI["IUniswapV2Pair"], pairAddr)
    router = new web3.eth.Contract(ABI["IUniswapV2Router01"], routerAddr)

    account = (await web3.eth.getAccounts())[0]
    xxxDecimals = BN(await xxx.methods.decimals().call())

    web3.eth.subscribe('newBlockHeaders', scheduleUpdate) // Setup schedule on new blocks.
    scheduleUpdate()
  } catch (e) {
    console.log("Error connecting to web3:", e)
    alert("Error connecting to your web3 provider.\nCheck the console for more info.")
  }
  enablingEth = false
}

swapBtn.onclick = async () => {
  let {inputAmount, outputAmount} = await calculateOutputs()

  // Calculate acceptable slippage
  let slippage
  try {
    slippage = inputSlippage.value ? BN(inputSlippage.value*10) : undefined // Multiply by 10 since we want bips
  } catch {}
  slippage = slippage ? slippage : BN(5)
  const minmumOutput = outputAmount.sub(outputAmount.mul(BN(1000)).mul(slippage).div(BN(1000000)))

  if (selling) { // Are we selling xxx ?
    // Yes
    if (inputAmount.gt(BN(await xxx.methods.allowance(account, routerAddr).call()))) {// Checking if we have enough approval
      await xxx.methods.approve(routerAddr, MAXUINT256).send({from: account}) // Send approval
    }
    await router.methods.swapExactTokensForETH(inputAmount, minmumOutput, [xxxAddr, WETHAddr], account, MAXUINT256).send({from: account}) // Do the swap, infinite deadline
  } else {
    await router.methods.swapExactETHForTokens(minmumOutput, [WETHAddr, xxxAddr], account, MAXUINT256).send({from: account, value: inputAmount}) // Do the swap, infinite deadline
  }
}
