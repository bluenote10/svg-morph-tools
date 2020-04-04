
if (false) {
  var draw = SVG('#svg8')
  //draw.rect(100,100).animate().fill('#f03').move(100,100)

  var rect = SVG('#rect815')
  //rect.fill('#000').animate().fill('#FFF').stroke('#0F0')
  rect.attr({ fill: '#ff0066' }).animate().attr({ x: 20, y: 60, fill: '#ff0066' }).size(20, 30).fill({ color: '#f06', opacity: 0.6 })

  console.log("draw:", draw);

  console.log("rect:", rect);
}

if (false) {
  anime({
    targets: '#path821',
    /*
    points: [
      { value: 'm 29.482142,91.380952 c 0,0 15.119046,32.505958 41.577381,39.482138', }
    ],
    */
    //translateX: 250,
    //rotate: '1turn',
    d: [
      'm 29.482142,91.380952 c 0,0 15.119046,32.505958 41.577381,39.482138',
      'm 29.482142,91.380952 c 0,0 15.119046,32.505958 41.577381,49.482138'
    ],
    //translateX: 25,
    backgroundColor: '#FFF',
    duration: 800
  });

}

var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '#path20',
  d: "M 66.523809,157.14881 106.27616,172.56129",
})
.add({
  targets: '#path20',
  d: "M 66.523808,157.14881 119.14309,79.863411",
})