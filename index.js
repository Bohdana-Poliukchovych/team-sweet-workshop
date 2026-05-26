import{S as F,N as G,P as W,a as g,i as y,r as D,A as Z}from"./assets/vendor-B_nRCiHV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const u of s)if(u.type==="childList")for(const m of u.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function n(s){const u={};return s.integrity&&(u.integrity=s.integrity),s.referrerPolicy&&(u.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?u.credentials="include":s.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function d(s){if(s.ep)return;s.ep=!0;const u=n(s);fetch(s.href,u)}})();window.innerWidth>=768&&new F(".about-swiper",{modules:[G,W],slidesPerView:2,spaceBetween:24,speed:800,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:!1},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1280:{slidesPerView:2,spaceBetween:24}}});const v="https://deserts-store.b.goit.study/api";async function ee(e={}){const{data:t}=await g.get(`${v}/desserts`,{params:e});return t}async function te(e){const{data:t}=await g.get(`${v}/desserts/${e}`);return t}async function ne(){const{data:e}=await g.get(`${v}/categories`);return e}async function se(){const{data:e}=await g.get(`${v}/feedbacks`);return e}async function re(e){const{data:t}=await g.post(`${v}/orders`,e);return t}const oe=/^(?=.{5,}$)(?:[\p{L}]|[\p{N}]|\s|[.,!?;:()'])+$/u,a=document.querySelector(".order-backdrop"),l=document.querySelector("#order-form"),P=a==null?void 0:a.querySelector(".close-btn"),L=l==null?void 0:l.querySelector('button[type="submit"]'),p=l==null?void 0:l.querySelector('textarea[name="comment"]');let b=(l==null?void 0:l.dataset.dessertId)||"";function k(){const e=a==null?void 0:a.classList.contains("is-open");document.body.classList.toggle("modal-open",!!e)}function ie(e){!e||typeof e!="string"||(b=e.trim(),l&&(l.dataset.dessertId=b))}function M(e){ie(e),a==null||a.classList.add("is-open"),k()}function $(){a==null||a.classList.remove("is-open"),k()}function B(){if(!p)return;const e=p.value.trim();if(!e){p.setCustomValidity("");return}oe.test(e)?p.setCustomValidity(""):p.setCustomValidity("Мінімум 5 символів: літери, цифри, пробіли і знаки . , ! ? ; : ( ) '")}function ae(e){const t=String(e||"").trim().replace(/[\s()\-]/g,"");return t.startsWith("+")?t.slice(1):t}P==null||P.addEventListener("click",$);a==null||a.addEventListener("click",e=>{e.target===a&&$()});document.addEventListener("keydown",e=>{e.key==="Escape"&&(a!=null&&a.classList.contains("is-open"))&&$()});document.addEventListener("order-modal:open",e=>{var t;M(((t=e.detail)==null?void 0:t.dessertId)||"")});document.addEventListener("click",e=>{const t=e.target.closest("[data-order-open]");if(!t)return;const n=t.dataset.dessertId||t.getAttribute("data-dessert-id")||"";M(n)});p==null||p.addEventListener("input",B);p==null||p.addEventListener("blur",B);l==null||l.addEventListener("submit",async e=>{var u,m,O,T;if(e.preventDefault(),B(),!l.checkValidity()){l.reportValidity();return}if(!b){y.error({title:"Помилка",message:"Неможливо оформити замовлення: спочатку оберіть десерт.",position:"topRight",timeout:5e3});return}const{name:t,phone:n,comment:d}=l.elements,s={name:t.value.trim(),phone:ae(n.value),comment:d.value.trim(),dessertId:b};L&&(L.disabled=!0);try{const r=await re(s),q=(r==null?void 0:r.dessert)||(r==null?void 0:r.dessertName)||"десерт",X=(r==null?void 0:r.orderNumber)||(r==null?void 0:r.id)||(r==null?void 0:r._id)||"невідомий";y.success({title:"Успіх",message:`Ви замовили ${q}, номер вашого замовлення: ${X}`,position:"topRight",timeout:4e3}),l.reset(),$()}catch(r){const q=((m=(u=r==null?void 0:r.response)==null?void 0:u.data)==null?void 0:m.message)||((T=(O=r==null?void 0:r.response)==null?void 0:O.data)==null?void 0:T.error)||(r==null?void 0:r.message)||"Не вдалося оформити замовлення. Спробуйте ще раз.";y.error({title:"Помилка",message:q,position:"topRight",timeout:5e3})}finally{L&&(L.disabled=!1)}});k();window.openOrderModal=M;const i=document.querySelector("#productModalOverlay"),S=i==null?void 0:i.querySelector(".CloseButton"),E=i==null?void 0:i.querySelector(".OrderButton");let C=null,R="";async function ce(e,t=null){if(console.clear(),!!i){if(typeof e=="string"||typeof e=="number"){C=e,t&&(R=t.textContent,t.textContent="Завантаження...",t.disabled=!0);try{const n=await te(e);N(n)}catch(n){console.error("Помилка завантаження:",n),y.error({title:"Упс!",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight",timeout:4e3});return}finally{t&&(t.textContent=R,t.disabled=!1)}}else typeof e=="object"&&e!==null&&(C=e._id,N(e));i.classList.remove("is-hidden"),document.body.style.overflow="hidden",le()}}function w(){i&&(i.classList.add("is-hidden"),document.body.style.overflow="",de())}function le(){S&&S.addEventListener("click",w),i.addEventListener("click",K),window.addEventListener("keydown",U),E&&E.addEventListener("click",Y)}function de(){S&&S.removeEventListener("click",w),i.removeEventListener("click",K),window.removeEventListener("keydown",U),E&&E.removeEventListener("click",Y)}function K(e){e.target===i&&w()}function U(e){e.code==="Escape"&&w()}function Y(){w(),C?M(C):console.warn("ID десерту не знайдено!")}function N(e){if(!e||!i)return;i.querySelector(".ProductTitle").textContent=e.name||"Десерт",i.querySelector(".ProductPrice").textContent=e.price?`${e.price} грн`:"";const t=i.querySelector("#productRatingContainer");t&&(t.innerHTML="",D({starSize:20,rating:e.rate||0,element:t,readOnly:!0,starGap:4}));const n=i.querySelector(".ProductImage");n&&(n.src=e.image||"https://placehold.co/450x450?text=No+Image",n.alt=e.name||"Десерт"),i.querySelector(".ProductDescription").textContent=e.description||"";const d=i.querySelector(".ProductIngredients");d&&(d.innerHTML=`<strong>Склад:</strong> ${e.composition||"Інформація відсутня"}`)}const ue="/team-sweet-workshop/assets/sprite-Bu-390yt.svg",pe=8,J={_id:"",name:"Всі десерти"},V=["Всі десерти","Італійські десерти","Гарячі десерти","Заварні тістечка","Класичні торти","Легкі десерти","Незвичайні десерти","Французькі тістечка","Фруктові десерти","Холодні десерти","Шоколадні випічки"],c={section:document.querySelector(".dessert-list-section"),radioList:document.querySelector("[data-category-list]"),select:document.querySelector(".dessert-category-select"),dessertList:document.querySelector("[data-dessert-list]"),loadMoreBtn:document.querySelector("[data-load-more]")},o={categories:[J],activeCategory:"",page:1,totalItems:0,isLoading:!1};c.section&&fe();async function fe(){me(),await I(async()=>{try{const e=await ne();o.categories=ve(e),we(),await A({replace:!0})}catch(e){x("Не вдалося завантажити десерти. Спробуйте оновити сторінку."),console.error(e)}})}function me(){var e,t,n,d;(e=c.radioList)==null||e.addEventListener("change",H),(t=c.select)==null||t.addEventListener("change",H),(n=c.loadMoreBtn)==null||n.addEventListener("click",ye),(d=c.dessertList)==null||d.addEventListener("click",ge)}async function H(e){const t=e.target.value;t===o.activeCategory||o.isLoading||(o.activeCategory=t,o.page=1,Me(),await I(async()=>{try{await A({replace:!0})}catch(n){x("Не вдалося завантажити десерти цієї категорії."),console.error(n)}}))}async function ye(){if(o.isLoading)return;const e=o.page+1;_(!0),await I(async()=>{try{const t=o.page;o.page=e,await A({replace:!1}),o.page=e}catch(t){o.page-=1,x("Не вдалося завантажити наступні десерти."),console.error(t)}}),_(!1)}function ge(e){const t=e.target.closest(".dessert-card-more");t&&ce(t.dataset.id)}function ve(e){const t=new Map(e.map(s=>[s.name,s])),n=V.slice(1).map(s=>t.get(s)).filter(Boolean),d=e.filter(s=>!V.includes(s.name));return[J,...n,...d]}function we(){const e=[],t=[];for(const n of o.categories)e.push(Le(n)),t.push(he(n));c.radioList.innerHTML=e.join(""),c.select.innerHTML=t.join("")}function Le({_id:e,name:t}){return`
    <label class="dessert-category-label">
      <input
        class="dessert-category-input"
        type="radio"
        name="dessert-category"
        value="${f(e)}"
        ${Q(e)?"checked":""}
      />

      <span class="dessert-category-name">
        ${f(t)}
      </span>
    </label>
  `}function he({_id:e,name:t}){return`
    <option
      value="${f(e)}"
      ${Q(e)?"selected":""}
    >
      ${f(t)}
    </option>
  `}function Q(e){return e===o.activeCategory}async function A({replace:e}){const t=await ee({page:o.page,limit:pe,...o.activeCategory&&{category:o.activeCategory}}),n=t.desserts??[];o.totalItems=t.totalItems??n.length,e&&Ee(),c.dessertList.insertAdjacentHTML("beforeend",n.map(be).join("")),Ce(),$e()}function be(e){var n;const t=((n=e.category)==null?void 0:n.name)??"Десерт";return`
    <li class="dessert-card">
      <img
        class="dessert-card-img"
        src="${f(e.image)}"
        alt="${f(e.name)}"
        loading="lazy"
      />

      <p class="dessert-card-category">
        ${f(t)}
      </p>

      <h3 class="dessert-card-title">
        ${f(e.name)}
      </h3>

      <p class="dessert-card-description">
        ${f(e.description)}
      </p>

      <div class="dessert-card-bottom">
        <p class="dessert-card-price">
          ${e.price} грн
        </p>

        ${Se(e._id,e.name)}
      </div>
    </li>
  `}function Se(e,t){return`
    <button
      class="dessert-card-more"
      type="button"
      data-id="${e}"
      aria-label="${f(t)}"
    >
      <svg
        class="dessert-card-icon"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <use href="${ue}#icon-arrow-outward"></use>
      </svg>
    </button>
  `}function Ee(){c.dessertList.innerHTML=""}function Ce(){const t=c.dessertList.children.length<o.totalItems;c.loadMoreBtn.hidden=!t,c.loadMoreBtn.disabled=o.isLoading||!t}function Me(){const e=c.radioList.querySelector(`.dessert-category-input[value="${qe(o.activeCategory)}"]`);e&&(e.checked=!0),c.select.value=o.activeCategory}function j(e){o.isLoading=e,c.loadMoreBtn.hidden||(c.loadMoreBtn.disabled=e,c.loadMoreBtn.textContent=e?"Завантаження...":"Завантажити ще")}function _(e){c.loadMoreBtn.classList.toggle("is-loading",e),c.loadMoreBtn.setAttribute("aria-busy",String(e))}async function I(e){j(!0);try{await e()}finally{j(!1)}}function x(e){y.error({title:"Помилка",message:e,position:"topRight"})}function $e(){y.destroy()}function f(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function qe(e){var t;return(t=window.CSS)!=null&&t.escape?CSS.escape(e):String(e).replaceAll('"','\\"')}const z=document.querySelector(".reviews-swiper .swiper-wrapper");Pe();async function Pe(){try{const{feedbacks:e}=await se();ke(e.slice(0,10)),Be()}catch(e){console.log(e)}}function ke(e){if(!z)return;const t=e.map(({rate:n,description:d,author:s})=>`
    <div class="swiper-slide review-card">
    <div id="rater" data-rate="${n}"></div>
    <p class="review-paragraph">${d}</p>
    <p class="review-author">${s}</p>
    </div> `).join("");z.innerHTML=t,Ae()}function Be(){new F(".reviews-swiper",{modules:[G,W],slidesPerView:1,breakpoints:{768:{slidesPerView:"auto"}},spaceBetween:24,navigation:{nextEl:".reviews-prev",prevEl:".reviews-next"},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},mousewheel:!0,keyboard:!0})}function Ae(){document.querySelectorAll("#rater").forEach(t=>{D({element:t,rating:Number(t.dataset.rate)||0,readOnly:!0,starSize:20,step:.5})})}new Z(".accordion-container",{duration:400,showMultiple:!1,onlyChildNodes:!1});const h=document.querySelector(".hero-btn");h==null||h.addEventListener("click",()=>{const e=h.dataset.scrollTo,t=document.querySelector(e);t==null||t.scrollIntoView({behavior:"smooth",block:"start"})});
//# sourceMappingURL=index.js.map
