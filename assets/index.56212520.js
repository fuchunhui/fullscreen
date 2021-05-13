class e extends HTMLElement{constructor(){super(),this.currentIndex=0,this.bindListeners()}bindListeners(){this.tabClick=this.tabClick.bind(this)}connectedCallback(){this.render(),this.addEventListener(),this.setCurrent(this.currentIndex)}render(){this.attachShadow({mode:"open"}).innerHTML='\n<div class="tab-list">\n<style>\n:host {\n  display: flex;\n  flex-direction: column;\n}\n.tab-nav {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  gap: var(--tab-gap, 0px);\n  color: var(--tab-nav-color, #333333)\n}\n.tab-nav ::slotted(*) {\n  padding: 0 10px;\n  border-bottom: 2px solid transparent;\n  font-size: 16px;\n  user-select: none;\n  cursor: pointer;\n}\n.tab-nav ::slotted(.active) {\n  border-bottom-color: #4C84FF;\n}\n.tab-content ::slotted(*) {\n  display: none;\n}\n.tab-content ::slotted(.active) {\n  display: block;\n  padding: 5px;\n}\n</style>\n<div class="tab-nav">\n  <slot name="nav" class="nav-item"></slot>\n</div>\n<div class="tab-content">\n  <slot name="content" class="content-item"></slot>\n</div>\n</div>\n',this.loadCSS()}setCurrent(e){this.setTabActive(e,this.getNavList()),this.setTabActive(e,this.getContentList())}addEventListener(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".nav-item");e&&e.addEventListener("click",this.tabClick)}tabClick(e){if(!e.target)return;const t=this.getNavList().indexOf(e.target);t!==this.currentIndex&&(this.currentIndex=t,this.setCurrent(t))}getElementList(e){if(!this.shadowRoot)return[];return this.shadowRoot.querySelector(e).assignedElements()}getNavList(){return this.getElementList(".nav-item")}getContentList(){return this.getElementList(".content-item")}setTabActive(e,t){t.forEach(((t,n)=>{n===e?t.classList.add("active"):t.classList.remove("active")}))}loadCSS(){var e;const t=document.createElement("style"),n=this.getAttribute("href");t.innerHTML=`@import '${n}';`,null==(e=this.shadowRoot)||e.append(t)}}customElements.define("tab-list",e);let t=[];const n=()=>{document.fullscreenElement||c()},s=()=>{document.webkitFullscreenElement||c()},l=()=>{document.mozFullScreenElement||c()},o=()=>{document.removeEventListener("fullscreenchange",n),document.removeEventListener("webkitfullscreenchange",s),document.removeEventListener("mozfullscreenchange",l)},r=(e,t)=>{e.classList.toggle(t)},c=()=>{t.forEach((e=>{r(e,"custom-fullscreen")})),t=[],window.dispatchEvent(new Event("resize")),o()};var i={requestFullscreen(e){0===t.length&&((()=>{const e=document.body;e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():console.error("Fullscreen API is not supported.")})(),o(),document.addEventListener("fullscreenchange",n),document.addEventListener("webkitfullscreenchange",s),document.addEventListener("mozfullscreenchange",l)),(e=>{t.push(e),r(e,"custom-fullscreen")})(e)},exitFullscreen(){t.length>1?(()=>{let e=t.pop();e&&r(e,"custom-fullscreen")})():document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():console.error("Fullscreen API is not supported.")}};const{requestFullscreen:a,exitFullscreen:d}=i;console.log("Hello World!"),console.log(a,d);
