import puppeteer from "puppeteer";

export default async (req, res) => {
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

    //PROXY_SERVER AUTHENTICATION
    // await page.authenticate({
    //   username: "PROXY_USERNAME",
    //   password: "PROXY_PASSWORD",
    // });

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
    console.log("Closing the browser...");
    await browser.close();
  }
};
