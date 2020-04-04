
const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="95.720329mm"
   height="56.032825mm"
   viewBox="0 0 95.720329 56.032825"
   version="1.1"
   id="svg8"
   inkscape:version="0.92.3 (2405546, 2018-03-11)"
   sodipodi:docname="frame1.svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="1.979899"
     inkscape:cx="36.35637"
     inkscape:cy="44.456852"
     inkscape:document-units="mm"
     inkscape:current-layer="layer1"
     showgrid="true"
     fit-margin-top="10"
     fit-margin-left="10"
     fit-margin-right="10"
     fit-margin-bottom="10"
     inkscape:window-width="1869"
     inkscape:window-height="1025"
     inkscape:window-x="51"
     inkscape:window-y="27"
     inkscape:window-maximized="1">
    <inkscape:grid
       type="xygrid"
       id="grid3713"
       originx="-24.238794"
       originy="-151.2388" />
  </sodipodi:namedview>
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(-24.238794,-89.728376)">
    <rect
       style="opacity:1;vector-effect:none;fill:#008080;fill-opacity:1;stroke:#2d2d2d;stroke-width:0.31407669;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
       id="rect3717"
       width="15.875"
       height="15.875"
       x="34.395832"
       y="119.72916" />
    <rect
       style="opacity:1;vector-effect:none;fill:#008080;fill-opacity:1;stroke:#2d2d2d;stroke-width:0.31407669;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
       id="rect3717-3"
       width="15.875"
       height="15.875"
       x="54.239582"
       y="99.885414" />
    <rect
       style="opacity:1;vector-effect:none;fill:#008080;fill-opacity:1;stroke:#2d2d2d;stroke-width:0.31407669;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
       id="rect3717-3-6"
       width="15.875"
       height="15.875"
       x="54.239582"
       y="119.72916" />
    <rect
       style="opacity:1;vector-effect:none;fill:#008080;fill-opacity:1;stroke:#2d2d2d;stroke-width:0.31407669;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
       id="rect3717-3-6-7"
       width="15.875"
       height="15.875"
       x="74.083336"
       y="119.72916" />
    <rect
       style="opacity:1;vector-effect:none;fill:#008080;fill-opacity:1;stroke:#2d2d2d;stroke-width:0.31407669;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
       id="rect3717-3-6-5"
       width="15.875"
       height="15.875"
       x="93.927086"
       y="119.72916" />
    <path
       style="fill:none;stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="M 42.333333,119.72917 C 42.199699,108.37021 45.018784,106.63363 54.239583,106.5"
       id="path3788"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="cc" />
  </g>
</svg>
`

var doc = new DOMParser().parseFromString(xml, 'application/xml')

console.log(doc.children)
console.log(doc.getElementsByTagName('svg')[0].getElementsByTagName('g'))
console.log(doc.getElementsByTagName('rect'))