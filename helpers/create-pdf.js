const puppeteer = require("puppeteer");
module.exports.createPDF = async (html, pdfPath) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--headless", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.emulateMediaType("screen");
  await page.pdf({
    path: pdfPath,
    margin: {
      top: "50px",
      right: "50px",
      bottom: "50px",
      left: "50px",
    },
    printBackground: true,
    format: "A4",
  });
  await page.close();
  await browser.close();
};
