if(!self.define){let e,a={};const c=(c,i)=>(c=new URL(c+".js",i).href,a[c]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=a,document.head.appendChild(e)}else e=c,importScripts(c),a()})).then((()=>{let e=a[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(i,s)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(a[f])return;let t={};const r=e=>c(e,f),o={module:{uri:f},exports:t,require:r};a[f]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(s(...e),t)))}}define(["./workbox-e0daa8b6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_expo/static/js/web/index-74a937a30eae3ccec4f55e0c6d8f8cfe.js",revision:"74a937a30eae3ccec4f55e0c6d8f8cfe"},{url:"_sitemap.html",revision:"8b0543ff7b15257bfd18c260dc25a0c9"},{url:"(tabs)/game.html",revision:"83a4e9ce27030c1eb535bf46244027ca"},{url:"(tabs)/index.html",revision:"5adf8246e44aa7f2daf56eaca30560da"},{url:"(tabs)/settings.html",revision:"3ab856e72e69693a22012f0ebca2689a"},{url:"+not-found.html",revision:"0d86d3544e2ef0a1e5c2fc19fe724ff3"},{url:"assets/assets/fonts/material.4e85bc9ebe07e0340c9c4fc2f6c38908.ttf",revision:"4e85bc9ebe07e0340c9c4fc2f6c38908"},{url:"assets/assets/fonts/SpaceMono-Regular.49a79d66bdea2debf1832bf4d7aca127.ttf",revision:"49a79d66bdea2debf1832bf4d7aca127"},{url:"favicon.ico",revision:"37e7fee41d42cc8ad6a95d630b4c4071"},{url:"game.html",revision:"83a4e9ce27030c1eb535bf46244027ca"},{url:"group/[id].html",revision:"f215c328349ed0fee7ea9059543fea00"},{url:"group/[id]/edit.html",revision:"582e56d2c426f0c1d1a8ff47272516a3"},{url:"index.html",revision:"5adf8246e44aa7f2daf56eaca30560da"},{url:"logo192.png",revision:"c181203b6b0c621d6f786094cf42978b"},{url:"logo512.png",revision:"c7b849bfdc3662ca1bee1e76b1201981"},{url:"manifest.json",revision:"5f35ab3b2d92b3c686640eec710e28ec"},{url:"settings.html",revision:"3ab856e72e69693a22012f0ebca2689a"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
