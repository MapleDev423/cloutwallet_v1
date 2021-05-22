const puppeteer = require("puppeteer");

// //fetch profiles
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

    // create a string of repeating '=' equal signs
    // for separation when logging to the console
    // Tell Puppeteer what to do with intercepted responses
    page.on("request", (request) => {
      if (request._url === "https://api.bitclout.com/get-profiles") {
        const data = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            origin: "https://bitclout.com",
            accept: "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
          },
          postData: JSON.stringify({
            PublicKeyBase58Check: "",
            Username: "",
            UsernamePrefix: "",
            Description: "",
            OrderBy: "newest_last_post",
            NumToFetch: 5,
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
    page.on("response", async (response) => {
      if (response._url === "https://api.bitclout.com/get-profiles") {
        profile = await response.json();
        console.log(profile);
      }
    });
    // navigate to a page
    const pageUrl = "https://api.bitclout.com/get-profiles";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } finally {
    console.log("Closing the browser...");
    await browser.close();
  }
})();
