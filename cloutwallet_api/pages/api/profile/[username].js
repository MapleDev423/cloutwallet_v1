import puppeteer from "puppeteer";

export default async (req, res) => {
  const {
    query: { username },
    method,
  } = req;
  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request._url === "https://api.bitclout.com/get-profiles") {
        const data = {
          method: method,
          headers: {
            "content-type": "application/json",
            origin: "https://bitclout.com",
            accept: "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
          },
          postData: JSON.stringify({
            PublicKeyBase58Check: "",
            Username: username,
            UsernamePrefix: "",
            Description: "",
            OrderBy: "newest_last_post",
            NumToFetch: 1,
            // Use @maebeam
            ReaderPublicKeyBase58Check:
              "BC1YLi6LpXTemAG8T9ptyWAkMywrjynwZcKjB5DkDXxrsG5kgAwAqxq",
            ModerationType: "",
            FetchUsersThatHODL: false,
            AddGlobalFeedBool: false,
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
      if (response._url === "https://api.bitclout.com/get-profiles") {
        const profile = await response.json();
        res.status(200).json({ success: true, data: profile });
      }
    });
    // navigate to a page
    const pageUrl = "https://api.bitclout.com/get-profiles";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } catch (e) {
    res.status(400).json({ success: false, error: e });
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
};
