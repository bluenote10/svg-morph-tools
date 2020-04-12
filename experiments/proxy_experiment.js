console.log('animating...')

function createProxy(selector, props) {
  let ref = document.getElementById(selector)

  const handler = {
    get: function (obj, prop) {
      if (typeof prop === 'string') {
        //console.log(prop)
        //console.log(ref.getAttribute(prop))
        console.log(`Getting value for ${prop}: ${ref.getAttribute(prop)}`)
        return ref.getAttribute(prop) || 0
      } else {
        return undefined
      }
    },
    set: function (obj, prop, value) {
      console.log(`Setting value for ${prop}: ${value}`)
      ref.setAttribute(prop, value)
      return true
    },
  }

  const p = new Proxy(props, handler)

  return p
}

var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 1750,
})

let rectRef = document.getElementById('rect3717-3-6-5')
console.log(rectRef)

let myWrapper = {
  value: 0,
}

tl.add({ targets: '#rect3717-3', x: 55.562504, y: 119.72916 }, 500)
  .add({ targets: '#rect3717-3-6', x: 75.40625 }, 500)
  .add({ targets: '#rect3717-3-6-7', x: 95.250008, y: 119.72917 }, 500)
  .add({ targets: '#rect3717-3-6-5', x: 115.09376 }, 500)
  .add(
    {
      targets: '#path3788',
      d: 'M 42.333333,119.72917 C 42.199699,108.37021 60.854167,105.17708 63.5,119.72917',
    },
    500
  )
  .add({ targets: '#rect3717-3-6', y: 117.08334 }, 1000)
  .add({ targets: '#rect3717-3-6-7', x: 95.25, y: 125.02084 }, 1000)
  .add(
    {
      targets: '#rect3717-3-6-5-disable',
      //"x":-11.215258,
      //"y":169.33269,
      //"rotate": -45.000011,
      transform: 'rotate(-45, 115, 119)',
      update: function (anim) {
        //console.log(anim);
        //console.log(anim.animatables[0].target)
        //console.log(JSON.stringify(anim.animatables[0].target.transform))
      },
    },
    1000
  )
  .add(
    {
      targets: myWrapper,
      value: -45,
      update: (anim) => {
        //console.log(`rotate(${myWrapper.value} 115 119)`)
        //console.log(rectRef.transform.baseVal.consolidate().matrix)
        //rectRef.transform = `rotate(${myWrapper.value}, 115, 119)`
        rectRef.setAttribute('transform', `rotate(${myWrapper.value} 123 126)`)
      },
    },
    1000
  )
  .add(
    {
      targets: createProxy('rect3717-3', { x: undefined }),
      transform: 'rotate(-45, 115, 119)',
      x: 100,
    },
    1000
  )
