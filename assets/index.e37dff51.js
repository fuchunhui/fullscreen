!function(e=".",o="__import__"){try{self[o]=new Function("u","return import(u)")}catch(t){const r=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[o]=e=>new Promise(((t,n)=>{const s=new URL(e,r);if(self[o].moduleMap[s])return t(self[o].moduleMap[s]);const c=new Blob([`import * as m from '${s}';`,`${o}.moduleMap['${s}']=m;`],{type:"text/javascript"}),a=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){n(new Error(`Failed to import: ${e}`)),l(a)},onload(){t(self[o].moduleMap[s]),l(a)}});document.head.appendChild(a)})),self[o].moduleMap={}}}("/fullscreen/assets/"),console.log("Hello World!");