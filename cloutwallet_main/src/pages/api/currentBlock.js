import puppeteer from "puppeteer";

export default async (req, res) => {
  // Puppeteer stuff
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"],
    executablePath: "/usr/bin/chromium-browser",
    ignoreHTTPSErrors: true,
    args: [
      "--proxy-server=us-wa.proxymesh.com:31280",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
    ],
  });
  try {
    const page = await browser.newPage();

    //PROXY_SERVER AUTHENTICATION
    await page.authenticate({
      username: "iaan",
      password: "XwwUXAi9@fp6mr9",
    });
    page.on("response", async (response) => {
      const data = await response.json();
      res.status(200).json({ success: true, data: data });
    });
    // navigate to a page
    const pageUrl = "https://api.bitclout.com/api/v1/";
    await page.goto(pageUrl, { waitUntil: "networkidle0" });
  } catch (e) {
    res.status(400).json({ success: false, eror: e });
  } finally {
    // console.log("Closing the browser...");
    await browser.close();
  }
};
