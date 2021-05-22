const puppeteer = require("puppeteer");

//Get the current block
(async () => {
  // Puppeteer stuff
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--proxy-server=us-fl.proxymesh.com:31280",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
    ],
  });
  try {
    const page = await browser.newPage();
    await page.authenticate({
      username: "PROXY_USERNAME",
      password: "PROXY_PASSWORD",
    });

    page.on("response", async (response) => {
      // Ignore OPTIONS requests
      const data = await response.json();
      console.log(data.Transactions[0].TransactionMetadata);
      console.log(data);
    });
    // navigate to a page
    const pageUrl = "https://api.bitclout.com/api/v1/";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
})();
