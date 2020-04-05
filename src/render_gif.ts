import * as path from 'path'
import * as puppeteer from 'puppeteer'
import * as child_prorcess from 'child_process'

declare var tl: any

async function takeScreenshot(page: puppeteer.Page, i: number, frameRate: number) {
  let t = i * frameRate
  await page.evaluate((t) => {
    console.log(t)
    tl.pause()
    tl.seek(t)
  }, t)

  let iPadded = i.toString().padStart(4, '0')
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

  const frameRate = 20 // 20 ms should give 50 fps gif
  const animLength = 2750
  const numFrames = animLength / frameRate
  console.log(`Rendering ${numFrames} frames`)

  for (let i = 0; i < numFrames; i++) {
    await takeScreenshot(page, i, frameRate)
  }

  await browser.close()

  let useFfmpeg = true

  if (useFfmpeg) {
    // ffmpeg -i video.mp4 -vf "settb=1/100,setpts='if(eq(N,0),0,if(not(mod(N,3)),PREV_OUTPTS+1,PREV_OUTPTS+2))'" -vsync vfr -r 100  out.gif
    // ffmpeg -f image2 -i /tmp/screenshot-%04d.png generated.gif
    // ffmpeg -i /tmp/screenshot-%04d.png -vf fps=50  generated.gif
    // gifski -o generated.gif /tmp/screenshot-0*.png
    child_prorcess.spawn(
      'ffmpeg -i /tmp/screenshot-%04d.png -vf "settb=1/100,setpts=\'if(eq(N,0),0,if(not(mod(N,3)),PREV_OUTPTS+1,PREV_OUTPTS+2))\'" -vsync vfr -r 100  generated.gif',
      {
        stdio: 'inherit',
      }
    )
  } else {
    child_prorcess.spawn('convert -delay 2 /tmp/screenshot-%04d.png generated.gif', {
      stdio: 'inherit',
    })
  }
}

render()

// https://superuser.com/a/1449427/173159
// https://github.com/tungs/timesnap
