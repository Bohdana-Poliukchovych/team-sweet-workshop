import{S as D,N as K,P as U,a as v,i as g,r as Y,A as ne}from"./assets/vendor-B_nRCiHV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const y of u.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&d(y)}).observe(document,{childList:!0,subtree:!0});function n(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerPolicy&&(u.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?u.credentials="include":o.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function d(o){if(o.ep)return;o.ep=!0;const u=n(o);fetch(o.href,u)}})();const p={openMobileMenu:document.querySelector(".js-open-mobile-menu"),closeMobileMenu:document.querySelector(".js-close-mobile-menu"),mobileMenu:document.querySelector(".js-mobile-menu"),logoMobileMenu:document.querySelector(".js-logo-mobile-menu"),linkMobileMenu:document.querySelectorAll(".js-mobile-menu-link"),btnShoppingMobileMenu:document.querySelector(".js-mobile-menu-shopping-btn"),mobileMenuBody:document.querySelector("body")};p.logoMobileMenu.addEventListener("click",A);p.btnShoppingMobileMenu.addEventListener("click",A);p.openMobileMenu.addEventListener("click",P);p.closeMobileMenu.addEventListener("click",P);document.addEventListener("keydown",P);function P(e){if(p.mobileMenu.classList.contains("is-open")&&e.key==="Escape"){p.mobileMenu.classList.remove("is-open"),p.mobileMenuBody.classList.remove("no-scroll");return}p.mobileMenu.classList.toggle("is-open"),p.mobileMenuBody.classList.toggle("no-scroll")}p.linkMobileMenu.forEach(e=>{e.addEventListener("click",A)});function A(){p.mobileMenu.classList.remove("is-open"),p.mobileMenuBody.classList.remove("no-scroll")}window.innerWidth>=768&&new D(".about-swiper",{modules:[K,U],slidesPerView:2,spaceBetween:24,speed:800,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".about-pagination",clickable:!0,dynamicBullets:!1},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1280:{slidesPerView:2,spaceBetween:24}}});const L="https://deserts-store.b.goit.study/api";async function oe(e={}){const{data:t}=await v.get(`${L}/desserts`,{params:e});return t}async function se(e){const{data:t}=await v.get(`${L}/desserts/${e}`);return t}async function re(){const{data:e}=await v.get(`${L}/categories`);return e}async function ie(){const{data:e}=await v.get(`${L}/feedbacks`);return e}async function ce(e){const{data:t}=await v.post(`${L}/orders`,e);return t}const ae=/^(?=.{5,}$)(?:[\p{L}]|[\p{N}]|\s|[.,!?;:()'])+$/u,c=document.querySelector(".order-backdrop"),l=document.querySelector("#order-form"),B=c==null?void 0:c.querySelector(".close-btn"),w=l==null?void 0:l.querySelector('button[type="submit"]'),m=l==null?void 0:l.querySelector('textarea[name="comment"]');let h=(l==null?void 0:l.dataset.dessertId)||"";function I(){const e=c==null?void 0:c.classList.contains("is-open");document.body.classList.toggle("modal-open",!!e)}function le(e){!e||typeof e!="string"||(h=e.trim(),l&&(l.dataset.dessertId=h))}function k(e){le(e),c==null||c.classList.add("is-open"),I()}function q(){c==null||c.classList.remove("is-open"),I()}function x(){if(!m)return;const e=m.value.trim();if(!e){m.setCustomValidity("");return}ae.test(e)?m.setCustomValidity(""):m.setCustomValidity("Мінімум 5 символів: літери, цифри, пробіли і знаки . , ! ? ; : ( ) '")}function de(e){const t=String(e||"").trim().replace(/[\s()\-]/g,"");return t.startsWith("+")?t.slice(1):t}B==null||B.addEventListener("click",q);c==null||c.addEventListener("click",e=>{e.target===c&&q()});document.addEventListener("keydown",e=>{e.key==="Escape"&&(c!=null&&c.classList.contains("is-open"))&&q()});document.addEventListener("order-modal:open",e=>{var t;k(((t=e.detail)==null?void 0:t.dessertId)||"")});document.addEventListener("click",e=>{const t=e.target.closest("[data-order-open]");if(!t)return;const n=t.dataset.dessertId||t.getAttribute("data-dessert-id")||"";k(n)});m==null||m.addEventListener("input",x);m==null||m.addEventListener("blur",x);l==null||l.addEventListener("submit",async e=>{var u,y,N,j;if(e.preventDefault(),x(),!l.checkValidity()){l.reportValidity();return}if(!h){g.error({title:"Помилка",message:"Неможливо оформити замовлення: спочатку оберіть десерт.",position:"topRight",timeout:5e3});return}const{name:t,phone:n,comment:d}=l.elements,o={name:t.value.trim(),phone:de(n.value),comment:d.value.trim(),dessertId:h};w&&(w.disabled=!0);try{const s=await ce(o),$=(s==null?void 0:s.dessert)||(s==null?void 0:s.dessertName)||"десерт",te=(s==null?void 0:s.orderNumber)||(s==null?void 0:s.id)||(s==null?void 0:s._id)||"невідомий";g.success({title:"Успіх",message:`Ви замовили ${$}, номер вашого замовлення: ${te}`,position:"topRight",timeout:4e3}),l.reset(),q()}catch(s){const $=((y=(u=s==null?void 0:s.response)==null?void 0:u.data)==null?void 0:y.message)||((j=(N=s==null?void 0:s.response)==null?void 0:N.data)==null?void 0:j.error)||(s==null?void 0:s.message)||"Не вдалося оформити замовлення. Спробуйте ще раз.";g.error({title:"Помилка",message:$,position:"topRight",timeout:5e3})}finally{w&&(w.disabled=!1)}});I();window.openOrderModal=k;const i=document.querySelector("#productModalOverlay"),S=i==null?void 0:i.querySelector(".CloseButton"),E=i==null?void 0:i.querySelector(".OrderButton");let C=null,V="";async function ue(e,t=null){if(console.clear(),!!i){if(typeof e=="string"||typeof e=="number"){C=e,t&&(V=t.textContent,t.textContent="Завантаження...",t.disabled=!0);try{const n=await se(e);H(n)}catch(n){console.error("Помилка завантаження:",n),g.error({title:"Упс!",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight",timeout:4e3});return}finally{t&&(t.textContent=V,t.disabled=!1)}}else typeof e=="object"&&e!==null&&(C=e._id,H(e));i.classList.remove("is-hidden"),document.body.style.overflow="hidden",pe()}}function b(){i&&(i.classList.add("is-hidden"),document.body.style.overflow="",me())}function pe(){S&&S.addEventListener("click",b),i.addEventListener("click",J),window.addEventListener("keydown",Q),E&&E.addEventListener("click",X)}function me(){S&&S.removeEventListener("click",b),i.removeEventListener("click",J),window.removeEventListener("keydown",Q),E&&E.removeEventListener("click",X)}function J(e){e.target===i&&b()}function Q(e){e.code==="Escape"&&b()}function X(){b(),C?k(C):console.warn("ID десерту не знайдено!")}function H(e){if(!e||!i)return;i.querySelector(".ProductTitle").textContent=e.name||"Десерт",i.querySelector(".ProductPrice").textContent=e.price?`${e.price} грн`:"";const t=i.querySelector("#productRatingContainer");t&&(t.innerHTML="",Y({starSize:20,rating:e.rate||0,element:t,readOnly:!0,starGap:4}));const n=i.querySelector(".ProductImage");n&&(n.src=e.image||"https://placehold.co/450x450?text=No+Image",n.alt=e.name||"Десерт"),i.querySelector(".ProductDescription").textContent=e.description||"";const d=i.querySelector(".ProductIngredients");d&&(d.innerHTML=`<strong>Склад:</strong> ${e.composition||"Інформація відсутня"}`)}const fe="/team-sweet-workshop/assets/sprite-Bu-390yt.svg",ye=8,Z={_id:"",name:"Всі десерти"},_=["Всі десерти","Італійські десерти","Гарячі десерти","Заварні тістечка","Класичні торти","Легкі десерти","Незвичайні десерти","Французькі тістечка","Фруктові десерти","Холодні десерти","Шоколадні випічки"],a={section:document.querySelector(".dessert-list-section"),radioList:document.querySelector("[data-category-list]"),select:document.querySelector(".dessert-category-select"),dessertList:document.querySelector("[data-dessert-list]"),loadMoreBtn:document.querySelector("[data-load-more]")},r={categories:[Z],activeCategory:"",page:1,totalItems:0,isLoading:!1};a.section&&ge();async function ge(){ve(),await T(async()=>{try{const e=await re();r.categories=we(e),Me(),await O({replace:!0})}catch(e){R("Не вдалося завантажити десерти. Спробуйте оновити сторінку."),console.error(e)}})}function ve(){var e,t,n,d;(e=a.radioList)==null||e.addEventListener("change",z),(t=a.select)==null||t.addEventListener("change",z),(n=a.loadMoreBtn)==null||n.addEventListener("click",Le),(d=a.dessertList)==null||d.addEventListener("click",be)}async function z(e){const t=e.target.value;t===r.activeCategory||r.isLoading||(r.activeCategory=t,r.page=1,$e(),await T(async()=>{try{await O({replace:!0})}catch(n){R("Не вдалося завантажити десерти цієї категорії."),console.error(n)}}))}async function Le(){if(r.isLoading)return;const e=r.page+1;G(!0),await T(async()=>{try{const t=r.page;r.page=e,await O({replace:!1}),r.page=e}catch(t){r.page-=1,R("Не вдалося завантажити наступні десерти."),console.error(t)}}),G(!1)}function be(e){const t=e.target.closest(".dessert-card-more");t&&ue(t.dataset.id)}function we(e){const t=new Map(e.map(o=>[o.name,o])),n=_.slice(1).map(o=>t.get(o)).filter(Boolean),d=e.filter(o=>!_.includes(o.name));return[Z,...n,...d]}function Me(){const e=[],t=[];for(const n of r.categories)e.push(he(n)),t.push(Se(n));a.radioList.innerHTML=e.join(""),a.select.innerHTML=t.join("")}function he({_id:e,name:t}){return`
    <label class="dessert-category-label">
      <input
        class="dessert-category-input"
        type="radio"
        name="dessert-category"
        value="${f(e)}"
        ${ee(e)?"checked":""}
      />

      <span class="dessert-category-name">
        ${f(t)}
      </span>
    </label>
  `}function Se({_id:e,name:t}){return`
    <option
      value="${f(e)}"
      ${ee(e)?"selected":""}
    >
      ${f(t)}
    </option>
  `}function ee(e){return e===r.activeCategory}async function O({replace:e}){const t=await oe({page:r.page,limit:ye,...r.activeCategory&&{category:r.activeCategory}}),n=t.desserts??[];r.totalItems=t.totalItems??n.length,e&&ke(),a.dessertList.insertAdjacentHTML("beforeend",n.map(Ee).join("")),qe(),Be()}function Ee(e){var n;const t=((n=e.category)==null?void 0:n.name)??"Десерт";return`
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

        ${Ce(e._id,e.name)}
      </div>
    </li>
  `}function Ce(e,t){return`
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
        <use href="${fe}#icon-arrow-outward"></use>
      </svg>
    </button>
  `}function ke(){a.dessertList.innerHTML=""}function qe(){const t=a.dessertList.children.length<r.totalItems;a.loadMoreBtn.hidden=!t,a.loadMoreBtn.disabled=r.isLoading||!t}function $e(){const e=a.radioList.querySelector(`.dessert-category-input[value="${Pe(r.activeCategory)}"]`);e&&(e.checked=!0),a.select.value=r.activeCategory}function F(e){r.isLoading=e,a.loadMoreBtn.hidden||(a.loadMoreBtn.disabled=e,a.loadMoreBtn.textContent=e?"Завантаження...":"Завантажити ще")}function G(e){a.loadMoreBtn.classList.toggle("is-loading",e),a.loadMoreBtn.setAttribute("aria-busy",String(e))}async function T(e){F(!0);try{await e()}finally{F(!1)}}function R(e){g.error({title:"Помилка",message:e,position:"topRight"})}function Be(){g.destroy()}function f(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Pe(e){var t;return(t=window.CSS)!=null&&t.escape?CSS.escape(e):String(e).replaceAll('"','\\"')}const W=document.querySelector(".reviews-swiper .swiper-wrapper");Ae();async function Ae(){try{const{feedbacks:e}=await ie();Ie(e.slice(0,10)),xe()}catch(e){console.log(e)}}function Ie(e){if(!W)return;const t=e.map(({rate:n,description:d,author:o})=>`
    <div class="swiper-slide review-card">
    <div id="rater" data-rate="${n}"></div>
    <p class="review-paragraph">${d}</p>
    <p class="review-author">${o}</p>
    </div> `).join("");W.innerHTML=t,Oe()}function xe(){new D(".reviews-swiper",{modules:[K,U],slidesPerView:1,breakpoints:{768:{slidesPerView:"auto"}},spaceBetween:24,navigation:{nextEl:".reviews-prev",prevEl:".reviews-next"},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},mousewheel:!0,keyboard:!0})}function Oe(){document.querySelectorAll("#rater").forEach(t=>{Y({element:t,rating:Number(t.dataset.rate)||0,readOnly:!0,starSize:20,step:.5})})}new ne(".accordion-container",{duration:400,showMultiple:!1,onlyChildNodes:!1});const M=document.querySelector(".hero-btn");M==null||M.addEventListener("click",()=>{const e=M.dataset.scrollTo,t=document.querySelector(e);t==null||t.scrollIntoView({behavior:"smooth",block:"start"})});
//# sourceMappingURL=index.js.map
