import * as path from 'path'
import * as puppeteer from 'puppeteer'

declare var tl: any

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function takeScreenshot(page: puppeteer.Page, i: number) {
  let iPadded = i.toString().padStart(4, '0')
  await delay(i * 10)
  await page.evaluate((i) => {
    tl.pause()
    let t = i * 10
    console.log(t)
    tl.seek(t)
  }, i)
  await page.screenshot({
    path: `/tmp/screenshot-${iPadded}.png`,
  })
  console.log(`Written screenshot: /tmp/screenshot-${i}.png`)
}

export async function render() {
  const url = `file:${path.join(__dirname, '..', '/generated.svg')}`
  console.log(url)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', (msg) => {
    console.log('Log from browser:', msg.text())
  })

  await page.goto(url, { waitUntil: 'networkidle2' })

  //await page.pdf({ path: 'page.pdf', format: 'A4' })

  const numFrames = 100
  const promises = Array.from(Array(numFrames).keys()).map((i) => takeScreenshot(page, i))
  await Promise.all(promises)

  /*
  //let screenshotNumber = 1
  page.screenshot({
    path: `/tmp/screenshot-${0}.jpg`,
  })

  for (let i = 0; i < 10; i++) {
    let ii = i
    setTimeout(() => {
      page.screenshot({
        path: `/tmp/screenshot-${ii}.jpg`,
      })
    }, 100 * (ii + 1))
  }
  */

  await browser.close()
}

render()

// https://superuser.com/a/1449427/173159
// https://github.com/tungs/timesnap
