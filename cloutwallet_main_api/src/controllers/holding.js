const puppeteer =  require('puppeteer');

const holding = async (req, res) => {
  const { method } = req;

  //the id is PublicKeyBase58Check
  const { id } = req.params;
  let browser = null;
  // Puppeteer stuff

  try {
    browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        "--proxy-server=us-wa.proxymesh.com:31280",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
      ],
    });
    const [page] = await browser.pages();
    await page.authenticate({
      username: "iaan",
      password: "XwwUXAi9@fp6mr9",
    });
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
    );
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
    await page._client.send("Network.enable", {
      maxResourceBufferSize: 1024 * 1204 * 100,
      maxTotalBufferSize: 1024 * 1204 * 200,
    });
    page.on("response", async (response) => {
      if (
        response._url ===
        "https://api.bitclout.com/get-users-stateless?shared_secret="
      ) {
        const payload = await response.json();
        res.status(200).json({
          success: true,
          data: {
            user: payload.UserList[0].ProfileEntryResponse,
            holdings: payload.UserList[0].UsersYouHODL,
          },
        });
      }
    });

    await page.goto(
      "https://api.bitclout.com/get-users-stateless?shared_secret=",
      { waitUntil: "networkidle2" }
    );
  } catch (e) {
    if (browser) {
      await browser.close();
    }
    throw e;
  }

  await browser.close();
};

module.exports = holding;