const puppeteer =  require('puppeteer');

const profile = async (req, res) => {
  async function scrapePrice() {
    let browser = null;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://bitclout.com/", { waitUntil: "networkidle0" });

      const [el] = await page.$x(
        "/html/body/app-root/div/app-landing-page/div[2]/div/div/div[2]/div/div[1]/label"
      );
      const price = await el.getProperty("textContent");
      const raw = await price.jsonValue();
      return Number(raw.replace(/[^0-9.-]+/g, ""));
    } catch (e) {
      console.log(e);
    } finally {
      await browser.close();
    }
  }
  const {
    params: { username },
    method,
  } = req;
  let browser = null;
  let profile;
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

    page.on("response", async (response) => {
      if (response._url === "https://api.bitclout.com/get-profiles") {
        profile = await response.json();
      }
    });

    await page.goto("https://api.bitclout.com/get-profiles", {
      waitUntil: "networkidle2",
    });

    if (profile.hasOwnProperty("error")) {
      await browser.close();
      return res
        .status(404)
        .json({ success: false, error: "Username does not exist" });
    }
  } catch (e) {
    await browser.close();
    res.status(400).json({ success: false, error: e });
    throw e;
  }
  const massage = profile.ProfilesFound[0];
  delete massage.Posts;
  delete massage.UsersWhoHODLYou;
  delete massage.PublicKeysBase58CheckFollowedByUser;

  let price = await scrapePrice();
  res.status(200).json({
    success: true,
    data: {
      profile: { ...massage },
      BitClout_price: price,
    },
  });
  await browser.close();
};

module.exports = profile;