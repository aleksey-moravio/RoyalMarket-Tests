const { toMatchImageSnapshot } = require("jest-image-snapshot");
const puppeteer = require("puppeteer");
const { KnownDevices } = require("puppeteer");
const iPhone = KnownDevices["iPhone 12 Pro"];
expect.extend({ toMatchImageSnapshot });

describe("iPhone 12 Pro", () => {
  let page;

  beforeEach(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.emulate(iPhone);
  });

  it("index", async () => {
    await page.goto("https://preview.dev.royalcc.market");
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
  });

  it("1.0_Login.html", async () => {
    await page.goto("https://preview.dev.royalcc.market/1.0_Login.html");
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot();
  });
});
