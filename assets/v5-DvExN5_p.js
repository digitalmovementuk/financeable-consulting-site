import{a as e}from"./rolldown-runtime-dwC9XI-f.js";import"./src-5pRCInzP.js";import{b as t}from"./vendor-Dm4CM2va.js";import{a as n}from"./gsap-4kqoo9xe.js";import{i as r}from"./motion-DSegMEWj.js";import{t as i}from"./SmoothScrollProvider-DnP3by5m.js";import{t as a}from"./App-Df9vPBnP.js";var o=t(),s=e(n(),1),c=r(),l={x:.46,y:.24},u=e=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(e)}`,d=[u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <circle cx="92" cy="74" r="34" fill="#EFF8F7"/>
    <path d="M42 140H178" stroke="#73DDD3" stroke-width="8" stroke-linecap="round"/>
    <path d="M198 118C226 118 248 140 248 168" stroke="#2B8D88" stroke-width="10" stroke-linecap="round"/>
    <circle cx="248" cy="168" r="9" fill="#2B8D88"/>
    <path d="M294 114H432" stroke="#C2D3DB" stroke-width="4" stroke-dasharray="10 12"/>
    <path d="M294 168H474" stroke="#C2D3DB" stroke-width="4" stroke-dasharray="10 12"/>
    <circle cx="454" cy="114" r="9" fill="#E5EEF1"/>
    <circle cx="506" cy="168" r="9" fill="#E5EEF1"/>
  </svg>`),u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <path d="M70 126H520" stroke="#C7D7DE" stroke-width="4" stroke-dasharray="10 12"/>
    <path d="M236 62V198" stroke="url(#lineA)" stroke-width="5"/>
    <path d="M382 72V190" stroke="url(#lineB)" stroke-width="5"/>
    <circle cx="126" cy="86" r="28" fill="#F6FBFA"/>
    <circle cx="282" cy="80" r="24" fill="#BDEFE8"/>
    <circle cx="432" cy="148" r="18" fill="#DCE9EE"/>
    <defs>
      <linearGradient id="lineA" x1="236" y1="62" x2="236" y2="198" gradientUnits="userSpaceOnUse">
        <stop stop-color="transparent"/><stop offset=".5" stop-color="#9FDCD8"/><stop offset="1" stop-color="transparent"/>
      </linearGradient>
      <linearGradient id="lineB" x1="382" y1="72" x2="382" y2="190" gradientUnits="userSpaceOnUse">
        <stop stop-color="transparent"/><stop offset=".5" stop-color="#79B7C6"/><stop offset="1" stop-color="transparent"/>
      </linearGradient>
    </defs>
  </svg>`),u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <path d="M74 82H210" stroke="#7BE3D9" stroke-width="8" stroke-linecap="round"/>
    <path d="M266 68V190" stroke="url(#speed)" stroke-width="5"/>
    <path d="M356 92H532" stroke="#B9CCD6" stroke-width="4" stroke-dasharray="10 12"/>
    <circle cx="126" cy="64" r="26" fill="#F5FBFB"/>
    <circle cx="478" cy="92" r="10" fill="#DDE7EB"/>
    <path d="M332 132H566" stroke="#C5D6DE" stroke-width="4" stroke-dasharray="10 12"/>
    <circle cx="552" cy="132" r="10" fill="#DDE7EB"/>
    <defs>
      <linearGradient id="speed" x1="266" y1="68" x2="266" y2="190" gradientUnits="userSpaceOnUse">
        <stop stop-color="transparent"/><stop offset=".52" stop-color="#CFE6EC"/><stop offset="1" stop-color="transparent"/>
      </linearGradient>
    </defs>
  </svg>`),u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260" fill="none">
    <rect x="70" y="46" width="222" height="108" rx="22" fill="#F8FCFC" stroke="#D7E5EA"/>
    <rect x="112" y="78" width="222" height="108" rx="22" fill="#FFFFFF" fill-opacity=".92" stroke="#D7E5EA"/>
    <rect x="154" y="108" width="246" height="112" rx="24" fill="#FFFFFF" stroke="#D1E1E7"/>
    <rect x="118" y="132" width="206" height="50" rx="18" fill="#FFFFFF" stroke="#D7E5EA"/>
    <path d="M144 156H272" stroke="#2B8D88" stroke-width="6" stroke-linecap="round"/>
    <circle cx="492" cy="82" r="22" fill="#E4F6F4"/>
    <circle cx="542" cy="146" r="16" fill="#D8E7EC"/>
  </svg>`)];function f({themeRef:e}){let t=(0,s.useRef)(null),n=(0,s.useRef)(null),r=(0,s.useRef)({x:0,y:0}),i=(0,s.useRef)({x:0,y:0}),a=(0,s.useRef)(l),o=(0,s.useRef)(l),[u,d]=(0,s.useState)(!1),[f,p]=(0,s.useState)(!1),[m,h]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{let s=window.matchMedia(`(pointer: fine)`),c=window.matchMedia(`(prefers-reduced-motion: reduce)`);if(!s.matches)return;let u=0,f=(t,n)=>{let r=e.current;if(!r)return;let i=Math.min(Math.max(t,.08),.92),a=Math.min(Math.max(n,.08),.88),o=78-(i-.5)*28,s=72-(a-.32)*24,c=(i-.5)*72,l=(a-.34)*56;r.style.setProperty(`--v5-mouse-x`,`${(i*100).toFixed(2)}%`),r.style.setProperty(`--v5-mouse-y`,`${(a*100).toFixed(2)}%`),r.style.setProperty(`--v5-mouse-accent-x`,`${o.toFixed(2)}%`),r.style.setProperty(`--v5-mouse-accent-y`,`${s.toFixed(2)}%`),r.style.setProperty(`--v5-mouse-shift-x`,`${c.toFixed(2)}px`),r.style.setProperty(`--v5-mouse-shift-y`,`${l.toFixed(2)}px`)},m=()=>{r.current.x+=(i.current.x-r.current.x)*.16,r.current.y+=(i.current.y-r.current.y)*.16,c.matches||(a.current.x+=(o.current.x-a.current.x)*.075,a.current.y+=(o.current.y-a.current.y)*.075,f(a.current.x,a.current.y)),t.current&&(t.current.style.transform=`translate3d(${r.current.x}px, ${r.current.y}px, 0) translate(-50%, -50%)`),n.current&&(n.current.style.transform=`translate3d(${i.current.x}px, ${i.current.y}px, 0) translate(-50%, -50%)`),u=window.requestAnimationFrame(m)},g=e=>{i.current={x:e.clientX,y:e.clientY},o.current={x:e.clientX/Math.max(window.innerWidth,1),y:e.clientY/Math.max(window.innerHeight,1)},d(!0);let t=e.target;if(t instanceof Element){let e=!!t.closest(`a, button, input, textarea, select, label, [role="button"]`);p(t=>t===e?t:e)}},_=()=>{d(!1),o.current=l},v=()=>h(!0),y=()=>h(!1);return f(l.x,l.y),u=window.requestAnimationFrame(m),window.addEventListener(`pointermove`,g,{passive:!0}),window.addEventListener(`pointerdown`,v,{passive:!0}),window.addEventListener(`pointerup`,y,{passive:!0}),document.addEventListener(`mouseleave`,_),()=>{window.cancelAnimationFrame(u),window.removeEventListener(`pointermove`,g),window.removeEventListener(`pointerdown`,v),window.removeEventListener(`pointerup`,y),document.removeEventListener(`mouseleave`,_)}},[e]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`div`,{ref:t,"aria-hidden":`true`,className:`v5-cursor-ring${u?` is-visible`:``}${f?` is-interactive`:``}${m?` is-pressed`:``}`}),(0,c.jsx)(`div`,{ref:n,"aria-hidden":`true`,className:`v5-cursor-dot${u?` is-visible`:``}${f?` is-interactive`:``}${m?` is-pressed`:``}`})]})}function p(){let e=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let t=e.current;if(!t)return;let n=()=>{let e=t.querySelector(`header a[href="#top"]`);if(e){e.classList.add(`v5-brand-lockup`),e.querySelector(`:scope > div:first-child`)?.classList.add(`v5-brand-icon`);let t=e.querySelector(`:scope > div:last-child`),n=t?.querySelector(`:scope > div:first-child`),r=t?.querySelector(`:scope > div:last-child`);t?.classList.add(`v5-brand-text`),n&&n.textContent!==`Cuno Consulting`&&(n.textContent=`Cuno Consulting`),r?.textContent&&(r.textContent=``)}t.querySelectorAll(`div`).forEach(e=>{if(e.textContent?.trim()!==`Cuno`)return;let t=e.nextElementSibling;!(t instanceof HTMLElement)||t.textContent?.trim()!==`Senior finance support`||(e.textContent=`Cuno Consulting`,e.classList.add(`v5-mobile-brand-title`),t.textContent=``)}),t.querySelectorAll(`img`).forEach(e=>{let t=e.getAttribute(`src`);t?.startsWith(`./media/voxr/`)&&e.setAttribute(`src`,t.replace(`./media/voxr/`,`../media/voxr/`))}),t.querySelectorAll(`[style]`).forEach(e=>{let t=e.style.backgroundImage;t.includes(`./media/voxr/`)&&(e.style.backgroundImage=t.replaceAll(`./media/voxr/`,`../media/voxr/`))});let n=t.querySelector(`main section:first-of-type .surface-glass .text-sm.text-lilac`);n&&n.textContent!==`Reporting`&&(n.textContent=`Reporting`),t.querySelector(`#contact`)?.closest(`.gradient-outline`)?.classList.add(`v5-hero-consultation-card`),t.querySelector(`#contact`)?.closest(`.relative`)?.classList.add(`v5-hero-consultation-wrap`),t.querySelector(`.marquee-track`)?.parentElement?.classList.add(`v5-hero-marquee-shell`),t.querySelectorAll(`#features article.feature-card`).forEach(e=>{e.classList.add(`v5-feature-card`)}),t.querySelector(`#journey .hidden.lg\\:flex`)?.firstElementChild?.classList.add(`v5-journey-intro`),t.querySelectorAll(`#journey article`).forEach(e=>{e.textContent?.includes(`Ready for clear monthly numbers`)&&e.classList.add(`v5-journey-ready-card`)}),t.querySelectorAll(`#benefits article`).forEach((e,t)=>{e.classList.add(`v5-benefit-card`);let n=e.querySelector(`img`);n?.classList.add(`v5-benefit-art`),n&&d[t]&&n.setAttribute(`src`,d[t])})};n();let r=new MutationObserver(()=>{window.requestAnimationFrame(n)});return r.observe(t,{childList:!0,subtree:!0}),()=>{r.disconnect()}},[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(f,{themeRef:e}),(0,c.jsx)(`div`,{ref:e,className:`v5-theme`,children:(0,c.jsx)(a,{})})]})}(0,o.createRoot)(document.getElementById(`root`)).render((0,c.jsx)(s.StrictMode,{children:(0,c.jsx)(i,{children:(0,c.jsx)(p,{})})}));