const { toMatchImageSnapshot } = require("jest-image-snapshot");
const puppeteer = require("puppeteer");
const { KnownDevices } = require("puppeteer");
const iPad = KnownDevices["iPad Pro 11"];
expect.extend({ toMatchImageSnapshot });
jest.setTimeout(30000);

let page;
let links = global.links;
let browser;

describe("iPad Pro 11", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.emulate(iPad);
  });
  afterEach(async () => {
    await browser.close();
  });

  for (const el of links) {
    it(el, async () => {
      await page.goto(el);
      const image = await page.screenshot({ fullPage: true });

      expect(image).toMatchImageSnapshot({
        failureThreshold: 0.5,
        failureThresholdType: "percent",
        runInProcess: true,
      });
    });
  }
});
