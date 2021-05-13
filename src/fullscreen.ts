export default {
  requestFullscreen(element: Element) {
    element.requestFullscreen()
  },

  exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  },

  isFullscreen(element: Element) {
    return document.fullscreenElement === element
  }
}
