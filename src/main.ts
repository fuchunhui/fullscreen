import './tab-list'
import pastTime from './past-time'

const {requestFullscreen, exitFullscreen, isFullscreen} = pastTime
const togglefs = (element: Element) => {
  if (isFullscreen(element)) {
    exitFullscreen()
  } else {
    requestFullscreen(element)
  }
}
window.togglefs = togglefs.bind(this)
