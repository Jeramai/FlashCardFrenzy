if(!self.define){let e,s={};const c=(c,i)=>(c=new URL(c+".js",i).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(i,o)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let r={};const n=e=>c(e,t),d={module:{uri:t},exports:r,require:n};s[t]=Promise.all(i.map((e=>d[e]||n(e)))).then((e=>(o(...e),r)))}}define(["./workbox-e0daa8b6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_expo/static/js/web/index-0b16b5e8284adb3761d38952149644f3.js",revision:"0b16b5e8284adb3761d38952149644f3"},{url:"assets/assets/fonts/material.4e85bc9ebe07e0340c9c4fc2f6c38908.ttf",revision:"4e85bc9ebe07e0340c9c4fc2f6c38908"},{url:"assets/assets/fonts/SpaceMono-Regular.49a79d66bdea2debf1832bf4d7aca127.ttf",revision:"49a79d66bdea2debf1832bf4d7aca127"},{url:"favicon.ico",revision:"37e7fee41d42cc8ad6a95d630b4c4071"},{url:"index.html",revision:"7cb196dd6c431db1d822e3b812f05b48"},{url:"logo192.png",revision:"c181203b6b0c621d6f786094cf42978b"},{url:"logo512.png",revision:"c7b849bfdc3662ca1bee1e76b1201981"},{url:"manifest.json",revision:"5f35ab3b2d92b3c686640eec710e28ec"},{url:"metadata.json",revision:"37cb2e8fcdd3b2523b9bd2f4b09087db"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
