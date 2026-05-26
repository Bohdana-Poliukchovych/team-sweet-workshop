import{S as z,N as F,P as G,a as y,i as m,r as W,A as X}from"./assets/vendor-B_nRCiHV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const u of s)if(u.type==="childList")for(const g of u.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&d(g)}).observe(document,{childList:!0,subtree:!0});function n(s){const u={};return s.integrity&&(u.integrity=s.integrity),s.referrerPolicy&&(u.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?u.credentials="include":s.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function d(s){if(s.ep)return;s.ep=!0;const u=n(s);fetch(s.href,u)}})();window.innerWidth>=768&&new z(".about-swiper",{modules:[F,G],slidesPerView:2,spaceBetween:24,speed:800,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:!1},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1280:{slidesPerView:2,spaceBetween:24}}});const v="https://deserts-store.b.goit.study/api";async function Z(e={}){const{data:t}=await y.get(`${v}/desserts`,{params:e});return t}async function ee(e){const{data:t}=await y.get(`${v}/desserts/${e}`);return t}async function te(){const{data:e}=await y.get(`${v}/categories`);return e}async function ne(){const{data:e}=await y.get(`${v}/feedbacks`);return e}async function se(e){const{data:t}=await y.post(`${v}/orders`,e);return t}const re=/^(?=.{5,}$)(?:[\p{L}]|[\p{N}]|\s|[.,!?;:()'])+$/u,a=document.querySelector(".order-backdrop"),l=document.querySelector("#order-form"),P=a==null?void 0:a.querySelector(".close-btn"),L=l==null?void 0:l.querySelector('button[type="submit"]'),p=l==null?void 0:l.querySelector('textarea[name="comment"]');let h=(l==null?void 0:l.dataset.dessertId)||"";function q(){const e=a==null?void 0:a.classList.contains("is-open");document.body.classList.toggle("modal-open",!!e)}function oe(e){!e||typeof e!="string"||(h=e.trim(),l&&(l.dataset.dessertId=h))}function C(e){oe(e),a==null||a.classList.add("is-open"),q()}function M(){a==null||a.classList.remove("is-open"),q()}function B(){if(!p)return;const e=p.value.trim();if(!e){p.setCustomValidity("");return}re.test(e)?p.setCustomValidity(""):p.setCustomValidity("Мінімум 5 символів: літери, цифри, пробіли і знаки . , ! ? ; : ( ) '")}function ie(e){const t=String(e||"").trim().replace(/[\s()\-]/g,"");return t.startsWith("+")?t.slice(1):t}P==null||P.addEventListener("click",M);a==null||a.addEventListener("click",e=>{e.target===a&&M()});document.addEventListener("keydown",e=>{e.key==="Escape"&&(a!=null&&a.classList.contains("is-open"))&&M()});document.addEventListener("order-modal:open",e=>{var t;C(((t=e.detail)==null?void 0:t.dessertId)||"")});document.addEventListener("click",e=>{const t=e.target.closest("[data-order-open]");if(!t)return;const n=t.dataset.dessertId||t.getAttribute("data-dessert-id")||"";C(n)});p==null||p.addEventListener("input",B);p==null||p.addEventListener("blur",B);l==null||l.addEventListener("submit",async e=>{var u,g,x,O;if(e.preventDefault(),B(),!l.checkValidity()){l.reportValidity();return}if(!h){m.error({title:"Помилка",message:"Неможливо оформити замовлення: спочатку оберіть десерт.",position:"topRight",timeout:5e3});return}const{name:t,phone:n,comment:d}=l.elements,s={name:t.value.trim(),phone:ie(n.value),comment:d.value.trim(),dessertId:h};L&&(L.disabled=!0);try{const r=await se(s),$=(r==null?void 0:r.dessert)||(r==null?void 0:r.dessertName)||"десерт",Q=(r==null?void 0:r.orderNumber)||(r==null?void 0:r.id)||(r==null?void 0:r._id)||"невідомий";m.success({title:"Успіх",message:`Ви замовили ${$}, номер вашого замовлення: ${Q}`,position:"topRight",timeout:4e3}),l.reset(),M()}catch(r){const $=((g=(u=r==null?void 0:r.response)==null?void 0:u.data)==null?void 0:g.message)||((O=(x=r==null?void 0:r.response)==null?void 0:x.data)==null?void 0:O.error)||(r==null?void 0:r.message)||"Не вдалося оформити замовлення. Спробуйте ще раз.";m.error({title:"Помилка",message:$,position:"topRight",timeout:5e3})}finally{L&&(L.disabled=!1)}});q();window.openOrderModal=C;const i=document.querySelector("#productModalOverlay"),b=i==null?void 0:i.querySelector(".CloseButton"),S=i==null?void 0:i.querySelector(".OrderButton");let E=null,R="";async function ae(e,t=null){if(console.clear(),!!i){if(typeof e=="string"||typeof e=="number"){E=e,t&&(R=t.textContent,t.textContent="Завантаження...",t.disabled=!0);try{const n=await ee(e);T(n)}catch(n){console.error("Помилка завантаження:",n),m.error({title:"Упс!",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight",timeout:4e3});return}finally{t&&(t.textContent=R,t.disabled=!1)}}else typeof e=="object"&&e!==null&&(E=e._id,T(e));i.classList.remove("is-hidden"),document.body.style.overflow="hidden",ce()}}function w(){i&&(i.classList.add("is-hidden"),document.body.style.overflow="",le())}function ce(){b&&b.addEventListener("click",w),i.addEventListener("click",D),window.addEventListener("keydown",K),S&&S.addEventListener("click",Y)}function le(){b&&b.removeEventListener("click",w),i.removeEventListener("click",D),window.removeEventListener("keydown",K),S&&S.removeEventListener("click",Y)}function D(e){e.target===i&&w()}function K(e){e.code==="Escape"&&w()}function Y(){w(),E?C(E):console.warn("ID десерту не знайдено!")}function T(e){if(!e||!i)return;i.querySelector(".ProductTitle").textContent=e.name||"Десерт",i.querySelector(".ProductPrice").textContent=e.price?`${e.price} грн`:"";const t=i.querySelector("#productRatingContainer");t&&(t.innerHTML="",W({starSize:20,rating:e.rate||0,element:t,readOnly:!0,starGap:4}));const n=i.querySelector(".ProductImage");n&&(n.src=e.image||"https://placehold.co/450x450?text=No+Image",n.alt=e.name||"Десерт"),i.querySelector(".ProductDescription").textContent=e.description||"";const d=i.querySelector(".ProductIngredients");d&&(d.innerHTML=`<strong>Склад:</strong> ${e.composition||"Інформація відсутня"}`)}const de=8,U={_id:"",name:"Всі десерти"},N=["Всі десерти","Італійські десерти","Гарячі десерти","Заварні тістечка","Класичні торти","Легкі десерти","Незвичайні десерти","Французькі тістечка","Фруктові десерти","Холодні десерти","Шоколадні випічки"],c={section:document.querySelector(".dessert-list-section"),radioList:document.querySelector("[data-category-list]"),select:document.querySelector(".dessert-category-select"),dessertList:document.querySelector("[data-dessert-list]"),loadMoreBtn:document.querySelector("[data-load-more]")},o={categories:[U],activeCategory:"",page:1,totalItems:0,isLoading:!1};c.section&&ue();async function ue(){pe(),await A(async()=>{try{const e=await te();o.categories=me(e),ye(),await k({replace:!0})}catch(e){I("Не вдалося завантажити десерти. Спробуйте оновити сторінку."),console.error(e)}})}function pe(){var e,t,n,d;(e=c.radioList)==null||e.addEventListener("change",V),(t=c.select)==null||t.addEventListener("change",V),(n=c.loadMoreBtn)==null||n.addEventListener("click",fe),(d=c.dessertList)==null||d.addEventListener("click",ge)}async function V(e){const t=e.target.value;t===o.activeCategory||o.isLoading||(o.activeCategory=t,o.page=1,Ee(),await A(async()=>{try{await k({replace:!0})}catch(n){I("Не вдалося завантажити десерти цієї категорії."),console.error(n)}}))}async function fe(){if(o.isLoading)return;const e=o.page+1;j(!0),await A(async()=>{try{const t=o.page;o.page=e,await k({replace:!1}),o.page=e}catch(t){o.page-=1,I("Не вдалося завантажити наступні десерти."),console.error(t)}}),j(!1)}function ge(e){const t=e.target.closest(".dessert-card-more");t&&ae(t.dataset.id)}function me(e){const t=new Map(e.map(s=>[s.name,s])),n=N.slice(1).map(s=>t.get(s)).filter(Boolean),d=e.filter(s=>!N.includes(s.name));return[U,...n,...d]}function ye(){const e=[],t=[];for(const n of o.categories)e.push(ve(n)),t.push(we(n));c.radioList.innerHTML=e.join(""),c.select.innerHTML=t.join("")}function ve({_id:e,name:t}){return`
    <label class="dessert-category-label">
      <input
        class="dessert-category-input"
        type="radio"
        name="dessert-category"
        value="${f(e)}"
        ${J(e)?"checked":""}
      />

      <span class="dessert-category-name">
        ${f(t)}
      </span>
    </label>
  `}function we({_id:e,name:t}){return`
    <option
      value="${f(e)}"
      ${J(e)?"selected":""}
    >
      ${f(t)}
    </option>
  `}function J(e){return e===o.activeCategory}async function k({replace:e}){const t=await Z({page:o.page,limit:de,...o.activeCategory&&{category:o.activeCategory}}),n=t.desserts??[];o.totalItems=t.totalItems??n.length,e&&be(),c.dessertList.insertAdjacentHTML("beforeend",n.map(Le).join("")),Se(),Ce()}function Le(e){var n;const t=((n=e.category)==null?void 0:n.name)??"Десерт";return`
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

        ${he(e._id,e.name)}
      </div>
    </li>
  `}function he(e,t){return`
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
        <use href="./img/sprite.svg#icon-arrow-outward"></use>
      </svg>
    </button>
  `}function be(){c.dessertList.innerHTML=""}function Se(){const t=c.dessertList.children.length<o.totalItems;c.loadMoreBtn.hidden=!t,c.loadMoreBtn.disabled=o.isLoading||!t}function Ee(){const e=c.radioList.querySelector(`.dessert-category-input[value="${Me(o.activeCategory)}"]`);e&&(e.checked=!0),c.select.value=o.activeCategory}function H(e){o.isLoading=e,c.loadMoreBtn.hidden||(c.loadMoreBtn.disabled=e,c.loadMoreBtn.textContent=e?"Завантаження...":"Завантажити ще")}function j(e){c.loadMoreBtn.classList.toggle("is-loading",e),c.loadMoreBtn.setAttribute("aria-busy",String(e))}async function A(e){H(!0);try{await e()}finally{H(!1)}}function I(e){m.error({title:"Помилка",message:e,position:"topRight"})}function Ce(){m.destroy()}function f(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Me(e){var t;return(t=window.CSS)!=null&&t.escape?CSS.escape(e):String(e).replaceAll('"','\\"')}const _=document.querySelector(".reviews-swiper .swiper-wrapper");$e();async function $e(){try{const{feedbacks:e}=await ne();Pe(e.slice(0,10)),qe()}catch(e){console.log(e)}}function Pe(e){if(!_)return;const t=e.map(({rate:n,description:d,author:s})=>`
    <div class="swiper-slide review-card">
    <div id="rater" data-rate="${n}"></div>
    <p class="review-paragraph">${d}</p>
    <p class="review-author">${s}</p>
    </div> `).join("");_.innerHTML=t,Be()}function qe(){new z(".reviews-swiper",{modules:[F,G],slidesPerView:1,breakpoints:{768:{slidesPerView:"auto"}},spaceBetween:24,navigation:{nextEl:".reviews-prev",prevEl:".reviews-next"},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},mousewheel:!0,keyboard:!0})}function Be(){document.querySelectorAll("#rater").forEach(t=>{W({element:t,rating:Number(t.dataset.rate)||0,readOnly:!0,starSize:20,step:.5})})}new X(".accordion-container",{duration:400,showMultiple:!1,onlyChildNodes:!1});
//# sourceMappingURL=index.js.map
