import './tab-list'
import pastTime from './past-time'

const {requestFullscreen, exitFullscreen, isFullscreen} = pastTime
const toggleofs = (element: Element) => {
  if (isFullscreen(element)) {
    exitFullscreen()
  } else {
    requestFullscreen(element)
  }
}
window.toggleofs = toggleofs.bind(this)
