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
    await page.authenticate({
      username: "PROXY_USERNAME",
      password: "PROXY_PASSWORD",
    });
    await page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (
        request._url ===
        "https://api.bitclout.com/get-users-stateless?shared_secret="
      ) {
        const data = {
          method: method,
          headers: {
            "content-type": "application/json",
            origin: "https://bitclout.com",
            accept: "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
          },
          postData: JSON.stringify({
            PublicKeysBase58Check: [id],
          }),
        };
        request.continue(data);
      }
    });
    page.on("response", async (response) => {
      if (
        response._url ===
        "https://api.bitclout.com/get-users-stateless?shared_secret="
      ) {
        const holding = await response.json();
        res.status(200).json({ success: true, data: holding });
      }
    });
    // navigate to a page
    const pageUrl =
      "https://api.bitclout.com/get-users-stateless?shared_secret=";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } catch (e) {
    res.status(400).json({ success: false, error: e });
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
};
