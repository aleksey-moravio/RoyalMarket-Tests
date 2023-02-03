module.exports = async () => {
  const puppeteer = require("puppeteer");
  const domain = "http://localhost:3000/";
  let links = [domain];

  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(domain);
  linkElements = await page.$$eval(".page-link", (el) =>
    el.map((x) => x.getAttribute("href"))
  );

  for (const el of linkElements) {
    links.push(domain + el);
  }
  global.links = links;
};
