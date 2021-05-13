import './tab-list'
import pastTime from './past-time'
import fullscreen from './fullscreen'

const {requestFullscreen: requestFull, exitFullscreen: exitFull, isFullscreen: isFull} = pastTime
const toggleofs = (element: Element) => {
  if (isFull(element)) {
    exitFull()
  } else {
    requestFull(element)
  }
}
window.toggleofs = toggleofs.bind(this)

const {requestFullscreen, exitFullscreen, isFullscreen} = fullscreen
const togglenfs = (element: Element) => {
  if (isFullscreen(element)) {
    exitFullscreen()
  } else {
    requestFullscreen(element)
  }
}
window.togglenfs = togglenfs.bind(this)
