if(!self.define){let e,i={};const s=(s,b)=>(s=new URL(s+".js",b).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(b,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let t={};const c=e=>s(e,d),o={module:{uri:d},exports:t,require:c};i[d]=Promise.all(b.map((e=>o[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-e0daa8b6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_expo/static/js/web/index-b11269f404013cda430289c6d1bb7c26.js",revision:"b11269f404013cda430289c6d1bb7c26"},{url:"_sitemap.html",revision:"8576ba3c8b053f4907b9b1bacbf648d6"},{url:"(tabs)/game.html",revision:"7a02f73e0b93c5b1fa6ea38168ed7007"},{url:"(tabs)/index.html",revision:"9de2623233cdafbe8d0731b49f34d3db"},{url:"(tabs)/settings.html",revision:"a4e8b873ac5c09fed4c138b697e887a6"},{url:"+not-found.html",revision:"87bb81d4b30df329a499c00d89278475"},{url:"assets/assets/fonts/SpaceMono-Regular.49a79d66bdea2debf1832bf4d7aca127.ttf",revision:"49a79d66bdea2debf1832bf4d7aca127"},{url:"favicon.ico",revision:"37e7fee41d42cc8ad6a95d630b4c4071"},{url:"game.html",revision:"7a02f73e0b93c5b1fa6ea38168ed7007"},{url:"group/[id].html",revision:"8bde366b57c5c356a37bf060312952b0"},{url:"group/[id]/edit.html",revision:"e3feda8bb1113928c63e98694e56fff2"},{url:"index.html",revision:"9de2623233cdafbe8d0731b49f34d3db"},{url:"logo192.png",revision:"c181203b6b0c621d6f786094cf42978b"},{url:"logo512.png",revision:"c7b849bfdc3662ca1bee1e76b1201981"},{url:"manifest.json",revision:"5f35ab3b2d92b3c686640eec710e28ec"},{url:"settings.html",revision:"a4e8b873ac5c09fed4c138b697e887a6"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
