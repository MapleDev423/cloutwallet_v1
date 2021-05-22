import puppeteer from "puppeteer";

export default async (req, res) => {
  const { method } = req;

  //the id is PublicKeyBase58Check
  const { id } = req.query;

  // Puppeteer stuff
  const browser = await puppeteer.launch({
    headless: false,
    // PROXY_SERVER
    // args: [
    //   "--proxy-server=us-fl.proxymesh.com:31280",
    //   "--no-sandbox",
    //   "--disable-gpu",
    //   "--disable-dev-shm-usage",
    //   "--disable-setuid-sandbox",
    // ],
  });
  try {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);

    page;
    // create a string of repeating '=' equal signs
    // for separation when logging to the console
    // Tell Puppeteer what to do with intercepted responses
    page.on("request", (request) => {
      if (request._url === "https://api.bitclout.com/api/v1/transaction-info") {
        const data = {
          method: method,
          headers: {
            "content-type": "application/json",
          },
          postData: JSON.stringify({
            PublicKeyBase58Check: id,
            IsMempool: false,
          }),
        };
        request.continue(data);
      }
    });
    await page._client.send("Network.enable", {
      maxResourceBufferSize: 1024 * 1204 * 100,
      maxTotalBufferSize: 1024 * 1204 * 200,
    });
    page.on("response", async (response) => {
      if (
        response._url === "https://api.bitclout.com/api/v1/transaction-info"
      ) {
        const transaction = await response.json();
        res.status(200).json({ success: true, data: transaction });
      }
    });
    // navigate to a page
    const pageUrl = "https://api.bitclout.com/api/v1/transaction-info";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } catch (e) {
    res.status(400).json({ success: false, error: e });
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
};
