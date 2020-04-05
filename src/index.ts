import * as fs from 'fs'
import * as glob from 'glob'
import { program } from 'commander'

import { JSDOM } from 'jsdom'
import * as serialize from 'w3c-xmlserializer'

const Node = new JSDOM().window.Node

function loadSvgDom(filename: string): SVGSVGElement {
  const data = fs.readFileSync(filename)

  const doc = new JSDOM(data).window.document

  const svg = doc.getElementsByTagName('svg')[0]
  if (svg == null) {
    throw 'Cannot find an `svg` tag in given XML data.'
  }
  return svg
}

type AttrMap = { [key: string]: any }
type AttrDiffMap = { [key: string]: [any, any] }
type AttrDiffMaps = Array<{
  id: string
  diffs: AttrDiffMap
}>

function extractAttributes(e: Element): AttrMap {
  let result: AttrMap = {}
  let attributes = e.attributes
  for (let i = 0; i < attributes.length; i++) {
    result[attributes[i].name] = attributes[i].value
  }
  return result
}

function diffElements(elA: Element, elB: Element): AttrDiffMap {
  const result: AttrDiffMap = {}

  let a = extractAttributes(elA)
  let b = extractAttributes(elB)

  for (const key of Object.keys(b)) {
    if (a[key] != null && b[key] != null && a[key] !== b[key]) {
      result[key] = [a[key], b[key]]
    }
  }
  return result
}

function traverse(
  fused: SVGSVGElement,
  prev: SVGSVGElement,
  next: SVGSVGElement,
  allDiffs: AttrDiffMaps
) {
  next.childNodes.forEach((child) => {
    if (child.nodeType == Node.ELEMENT_NODE) {
      let el = child as Element
      let tag = el.tagName
      let id = el.id
      console.log(tag)

      if (tag === 'rect') {
        let prevEl = prev.getElementById(id) as Element
        if (prevEl != null) {
          let diff = diffElements(prevEl, el)
          console.log('diff:', diff)
          if (Object.keys(diff).length > 0) {
            allDiffs.push({
              id: id,
              diffs: diff,
            })
          }
        }
      } else if (tag === 'path') {
        let prevEl = prev.getElementById(id) as Element
        if (prevEl != null) {
          let diff = diffElements(prevEl, el)
          console.log('diff:', diff)
          if (Object.keys(diff).length > 0) {
            allDiffs.push({
              id: id,
              diffs: diff,
            })
          }
        }
      } else {
        traverse(fused, prev, el as SVGSVGElement, allDiffs)
      }
    } else if (child.nodeType == Node.TEXT_NODE) {
      console.log('TODO handle node')
    } else {
      console.log(`Unknown node type: ${child.nodeType}`)
    }
  })
}

function generateScriptTag(url: string): Element {
  const doc = new JSDOM().window.document
  // Element must be created under the svg namespace, to match its parent namespace.
  // Otherwise an xmlns="http://www.w3.org/1999/xhtml" is created.
  const el = doc.createElementNS('http://www.w3.org/2000/svg', 'script')
  el.setAttribute('type', 'text/javascript')
  el.setAttribute('xlink:href', url)
  return el
}

function generateJS(allDiffs: AttrDiffMaps): string {
  let text = `
  console.log("animating...")

  var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
  });

  tl`

  for (const diff of allDiffs) {
    let params = {
      targets: `#${diff.id}`,
    }
    for (let key of Object.keys(diff.diffs)) {
      let value = diff.diffs[key][1]
      params[key] = '' + Number(value) === value ? Number(value) : value
    }
    console.log(params)
    text += `
    .add(
      ${JSON.stringify(params)},
      0
    )`
  }

  return text
}

function diff(svgA: SVGSVGElement, svgB: SVGSVGElement) {
  let fused = svgA.cloneNode(true) as SVGSVGElement
  fused.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  //console.log(svgA.outerHTML)
  //console.log(serialize(fused))

  // let layersA = svgA.getElementsByTagName('g')

  const allDiffs = []
  traverse(fused, svgA, svgB, allDiffs)
  //console.log(new XMLSerializer().serializeToString(svgA));
  console.log(allDiffs)

  const scriptTag1 = generateScriptTag(
    'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.1.0/anime.min.js'
  )
  fused.appendChild(scriptTag1)
  const scriptTag2 = generateScriptTag('generated.js')
  fused.appendChild(scriptTag2)
  fs.writeFileSync('generated.svg', serialize(fused))
  fs.writeFileSync('generated.js', generateJS(allDiffs))
}

type Args = {
  files: string[]
}

function parseArgs(): Args {
  let filePatterns: string[] = []

  // prettier-ignore
  program
    .arguments('[svg-frame-file...]')
    .action(function (svgFrameFile) {
      filePatterns = svgFrameFile
    });
  program.parse(process.argv)

  let files: string[] = []
  for (const filePattern of filePatterns) {
    files = files.concat(glob.sync(filePattern))
  }

  if (files.length == 0) {
    console.error(
      `No files specified or no files found for patterns: ${JSON.stringify(
        filePatterns
      )}`
    )
    process.exit(1)
  }

  return {
    files,
  }
}

async function mainAsync() {
  const args = parseArgs()

  let frames = args.files.map((file) => loadSvgDom(file))

  diff(frames[0], frames[1])
}

function main() {
  mainAsync().catch((e) => {
    console.log('Unhandled exception:')
    console.log(e)
    process.exit(1)
  })
}

main()
