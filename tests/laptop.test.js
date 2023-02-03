const { toMatchImageSnapshot } = require("jest-image-snapshot");
const puppeteer = require("puppeteer");

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(30000);

let page;
let links = global.links;
let browser;

describe("LapTop", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({ defaultViewport: null });
    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
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
