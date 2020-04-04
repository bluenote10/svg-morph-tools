import * as path from 'path';
import * as puppeteer from 'puppeteer';

export async function render() {
  const url = `file:${path.join(__dirname, 'drawing.svg')}`
  console.log(url)

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.pdf({path: 'page.pdf', format: 'A4'});

  await browser.close();

}
