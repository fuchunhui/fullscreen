/**
 * @file 很多API已经废弃，现代浏览器对于fullscreen大部分API是兼容的
 */

let fullscreenList: Element[] = []

/**
 * .custom-fullscreen {
 *   position: fixed !important;
 *   top: 0;
 *   left: 0;
 *   right: 0;
 *   bottom: 0;
 *   background: #FFF;
 * }
 */
const FULLSCREEN = 'custom-fullscreen'

const normalFullscreen = () => {
  if (!document.fullscreenElement) {
    resetFullscreen()
  }
}
const webkitFullscreen = () => {
  if (!document.webkitFullscreenElement) { // 在浏览器api不兼容的时代，不得不这样写
    resetFullscreen()
  }
}
const mozfullscreen = () => {
  if (!document.mozFullScreenElement) {
    resetFullscreen()
  }
}

const removeListeners = () => {
  document.removeEventListener('fullscreenchange', normalFullscreen)
  document.removeEventListener('webkitfullscreenchange', webkitFullscreen)
  document.removeEventListener('mozfullscreenchange', mozfullscreen)
}

const addListeners = () => {
  document.addEventListener('fullscreenchange', normalFullscreen)
  document.addEventListener('webkitfullscreenchange', webkitFullscreen)
  document.addEventListener('mozfullscreenchange', mozfullscreen)
}

const toggleClass = (element: Element, name: string) => {
  element.classList.toggle(name)
}

const addClass = (element: Element) => {
  fullscreenList.push(element)
  toggleClass(element, FULLSCREEN)
}

const removeClass = () => {
  let elem = fullscreenList.pop()
  if (elem) {
    toggleClass(elem, FULLSCREEN)
  }
}

const removeAllClasses = () => {
  fullscreenList.forEach(item => {
    toggleClass(item, FULLSCREEN)
  })
  fullscreenList = []
}

const resetFullscreen = () => {
  removeAllClasses()
  window.dispatchEvent(new Event('resize'))
  removeListeners()
}

const launch = () => {
  const elem = document.body
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen()
  } else {
    console.error('Fullscreen API is not supported.')
  }
}

const cancelFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else {
    console.error('Fullscreen API is not supported.')
  }
}

export default {
  requestFullscreen(element: Element) {
    if (fullscreenList.length === 0) {
      launch()
      removeListeners()
      addListeners()
    }
    addClass(element)
  },

  exitFullscreen() {
    if (fullscreenList.length > 1) {
      removeClass()
    } else {
      cancelFullscreen()
    }
  }
}
