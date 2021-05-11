const TEMPLATE = `
<div class="tab-list">
<style>
:host {
  display: flex;
  flex-direction: column;
}
.tab-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--tab-gap, 0px);
}
.tab-nav ::slotted(*) {
  padding: 5px;
  border: 1px solid #ccc;
  user-select: none;
  cursor: pointer;
}
.tab-nav ::slotted(.active) {
  background: #efefef;
}
.tab-content ::slotted(*) {
  display: none;
}
.tab-content ::slotted(.active) {
  display: block;
  padding: 5px;
}
</style>
<div class="tab-nav">
  <slot name="nav" class="nav-item"></slot>
</div>
<div class="tab-content">
  <slot name="content" class="content-item"></slot>
</div>
</div>
`
const ACTIVE_CLASS = 'active'

class TabList extends HTMLElement {
  currentIndex = 0
  constructor() {
    super()
    this.bindListeners()
  }

  bindListeners() {
    this.tabClick = this.tabClick.bind(this)
  }

  connectedCallback() {
    this.render()
    this.addEventListener()
    this.setCurrent(this.currentIndex)
  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = TEMPLATE
  }

  setCurrent(tabIndex: number) {
    this.setTabActive(tabIndex, this.getNavList())
    this.setTabActive(tabIndex, this.getContentList())
  }

  addEventListener() {
    if (!this.shadowRoot) {
      return
    }
    const navItem: Element | null = this.shadowRoot.querySelector('.nav-item')
    if (navItem) {
      navItem.addEventListener('click', this.tabClick)
    }
  }

  tabClick(event: Event) {
    if (!event.target) {
      return
    }

    const tabIndex = this.getNavList().indexOf(event.target as Element)
    if (tabIndex !== this.currentIndex) {
      this.currentIndex = tabIndex
      this.setCurrent(tabIndex)
    }
  }

  getElementList(selectors: string) {
    if (!this.shadowRoot) {
      return []
    }
    const element = this.shadowRoot.querySelector(selectors)
    return (element as HTMLSlotElement).assignedElements()
  }

  getNavList() {
    return this.getElementList('.nav-item')
  }

  getContentList() {
    return this.getElementList('.content-item')
  }

  setTabActive(tabIndex: number, elementList: Element[]) {
    elementList.forEach((element, index) => {
      if (index === tabIndex) {
        element.classList.add(ACTIVE_CLASS)
      } else {
        element.classList.remove(ACTIVE_CLASS)
      }
    })
  }
}

customElements.define('tab-list', TabList)
