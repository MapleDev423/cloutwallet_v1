const puppeteer = require("puppeteer");

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
    await page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request._url === "https://api.bitclout.com/api/v1/transaction-info") {
        const data = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          postData: JSON.stringify({
            PublicKeyBase58Check:
              "BC1YLg8jcdGw1ec5UgpgdLrp4tK8mQwE5u9GxNA7FwFZkgnrvm642BZ",
            IsMempool: true,
          }),
        };
        request.continue(data);
      }
    });
    page.on("response", async (response) => {
      if (
        response._url === "https://api.bitclout.com/api/v1/transaction-info"
      ) {
        transaction = await response.json();
        const data = transaction;
        console.log(data);
      }
    });
    // navigate to a page
    const pageUrl = "https://api.bitclout.com/api/v1/transaction-info";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
})();
