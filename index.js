import{S as W,N as J,P as U,a as w,i as y,r as Y,A as se}from"./assets/vendor-B_nRCiHV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const g of l.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&u(g)}).observe(document,{childList:!0,subtree:!0});function o(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function u(s){if(s.ep)return;s.ep=!0;const l=o(s);fetch(s.href,l)}})();const p={openMobileMenu:document.querySelector(".js-open-mobile-menu"),closeMobileMenu:document.querySelector(".js-close-mobile-menu"),mobileMenu:document.querySelector(".js-mobile-menu"),logoMobileMenu:document.querySelector(".js-logo-mobile-menu"),linkMobileMenu:document.querySelectorAll(".js-mobile-menu-link"),btnShoppingMobileMenu:document.querySelector(".js-mobile-menu-shopping-btn"),mobileMenuBody:document.querySelector("body")};p.logoMobileMenu.addEventListener("click",B);p.btnShoppingMobileMenu.addEventListener("click",B);p.openMobileMenu.addEventListener("click",P);p.closeMobileMenu.addEventListener("click",P);document.addEventListener("keydown",P);function P(e){if(p.mobileMenu.classList.contains("is-open")&&e.key==="Escape"){p.mobileMenu.classList.remove("is-open"),p.mobileMenuBody.classList.remove("no-scroll");return}e.type==="click"&&(p.mobileMenu.classList.toggle("is-open"),p.mobileMenuBody.classList.toggle("no-scroll"))}p.linkMobileMenu.forEach(e=>{e.addEventListener("click",B)});function B(){p.mobileMenu.classList.remove("is-open"),p.mobileMenuBody.classList.remove("no-scroll")}window.innerWidth>=768&&new W(".about-swiper",{modules:[J,U],slidesPerView:2,spaceBetween:24,speed:800,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".about-pagination",clickable:!0,bulletClass:"about-pagination-bullet",bulletActiveClass:"about-pagination-bullet-active"},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1280:{slidesPerView:2,spaceBetween:24}}});const v="https://deserts-store.b.goit.study/api";async function re(e={}){const{data:t}=await w.get(`${v}/desserts`,{params:e});return t}async function ie(e){const{data:t}=await w.get(`${v}/desserts/${e}`);return t}async function ae(){const{data:e}=await w.get(`${v}/categories`);return e}async function ce(){const{data:e}=await w.get(`${v}/feedbacks`);return e}async function de(e){const{data:t}=await w.post(`${v}/orders`,e);return t}const le=/^(?=.{5,}$)(?:[\p{L}]|[\p{N}]|\s|[.,!?;:()'])+$/u,c=document.querySelector(".order-backdrop"),d=document.querySelector("#order-form"),A=c==null?void 0:c.querySelector(".close-btn"),b=d==null?void 0:d.querySelector('button[type="submit"]'),m=d==null?void 0:d.querySelector('textarea[name="comment"]');let M=(d==null?void 0:d.dataset.dessertId)||"";function I(){const e=c==null?void 0:c.classList.contains("is-open");document.body.classList.toggle("modal-open",!!e)}function ue(e){!e||typeof e!="string"||(M=e.trim(),d&&(d.dataset.dessertId=M))}function k(e){ue(e),c==null||c.classList.add("is-open"),I()}function q(){c==null||c.classList.remove("is-open"),I()}function x(){if(!m)return;const e=m.value.trim();if(!e){m.setCustomValidity("");return}le.test(e)?m.setCustomValidity(""):m.setCustomValidity("Мінімум 5 символів: літери, цифри, пробіли і знаки . , ! ? ; : ( ) '")}function pe(e){const t=String(e||"").trim().replace(/[\s()\-]/g,"");return t.startsWith("+")?t.slice(1):t}A==null||A.addEventListener("click",q);c==null||c.addEventListener("click",e=>{e.target===c&&q()});document.addEventListener("keydown",e=>{e.key==="Escape"&&(c!=null&&c.classList.contains("is-open"))&&q()});document.addEventListener("order-modal:open",e=>{var t;k(((t=e.detail)==null?void 0:t.dessertId)||"")});document.addEventListener("click",e=>{const t=e.target.closest("[data-order-open]");if(!t)return;const o=t.dataset.dessertId||t.getAttribute("data-dessert-id")||"";k(o)});m==null||m.addEventListener("input",x);m==null||m.addEventListener("blur",x);d==null||d.addEventListener("submit",async e=>{var l,g,j,D;if(e.preventDefault(),x(),!d.checkValidity()){d.reportValidity();return}if(!M){y.error({title:"Помилка",message:"Неможливо оформити замовлення: спочатку оберіть десерт.",position:"topRight",timeout:5e3});return}const{name:t,phone:o,comment:u}=d.elements,s={name:t.value.trim(),phone:pe(o.value),comment:u.value.trim(),dessertId:M};b&&(b.disabled=!0);try{const r=await de(s),$=(r==null?void 0:r.dessert)||(r==null?void 0:r.dessertName)||"десерт",ne=(r==null?void 0:r.orderNumber)||(r==null?void 0:r.id)||(r==null?void 0:r._id)||"невідомий";y.success({title:"Успіх",message:`Ви замовили ${$}, номер вашого замовлення: ${ne}`,position:"topRight",timeout:4e3}),d.reset(),q()}catch(r){const $=((g=(l=r==null?void 0:r.response)==null?void 0:l.data)==null?void 0:g.message)||((D=(j=r==null?void 0:r.response)==null?void 0:j.data)==null?void 0:D.error)||(r==null?void 0:r.message)||"Не вдалося оформити замовлення. Спробуйте ще раз.";y.error({title:"Помилка",message:$,position:"topRight",timeout:5e3})}finally{b&&(b.disabled=!1)}});I();window.openOrderModal=k;const a=document.querySelector("#productModalOverlay"),S=a==null?void 0:a.querySelector(".CloseButton"),E=a==null?void 0:a.querySelector(".OrderButton");let C=null,H="";async function me(e,t=null){if(console.clear(),!!a){if(typeof e=="string"||typeof e=="number"){C=e,t&&(H=t.textContent,t.textContent="Завантаження...",t.disabled=!0);try{const o=await ie(e);_(o)}catch(o){console.error("Помилка завантаження:",o),y.error({title:"Упс!",message:"Не вдалося завантажити дані. Спробуйте пізніше.",position:"topRight",timeout:4e3});return}finally{t&&(t.textContent=H,t.disabled=!1)}}else typeof e=="object"&&e!==null&&(C=e._id,_(e));a.classList.remove("is-hidden"),document.body.style.overflow="hidden",fe()}}function L(){a&&(a.classList.add("is-hidden"),document.body.style.overflow="",ge())}function fe(){S&&S.addEventListener("click",L),a.addEventListener("click",Q),window.addEventListener("keydown",X),E&&E.addEventListener("click",Z)}function ge(){S&&S.removeEventListener("click",L),a.removeEventListener("click",Q),window.removeEventListener("keydown",X),E&&E.removeEventListener("click",Z)}function Q(e){e.target===a&&L()}function X(e){e.code==="Escape"&&L()}function Z(){L(),C?k(C):console.warn("ID десерту не знайдено!")}function _(e){if(!e||!a)return;a.querySelector(".ProductTitle").textContent=e.name||"Десерт",a.querySelector(".ProductPrice").textContent=e.price?`${e.price} грн`:"";const t=a.querySelector("#productRatingContainer");t&&(t.innerHTML="",Y({starSize:20,rating:e.rate||0,element:t,readOnly:!0,starGap:4}));const o=a.querySelector(".ProductImage");o&&(o.src=e.image||"https://placehold.co/450x450?text=No+Image",o.alt=e.name||"Десерт"),a.querySelector(".ProductDescription").textContent=e.description||"";const u=a.querySelector(".ProductIngredients");u&&(u.innerHTML=`<strong>Склад:</strong> ${e.composition||"Інформація відсутня"}`)}const ye="/team-sweet-workshop/assets/sprite-Bu-390yt.svg",we=8,O={_id:"",name:"Всі десерти"},z=["Всі десерти","Італійські десерти","Гарячі десерти","Заварні тістечка","Класичні торти","Легкі десерти","Незвичайні десерти","Французькі тістечка","Фруктові десерти","Холодні десерти","Шоколадні випічки"],n={section:document.querySelector(".dessert-list-section"),radioList:document.querySelector("[data-category-list]"),dropdown:document.querySelector(".dessert-category-dropdown"),dropdownValue:document.querySelector(".dessert-category-dropdown-value"),dropdownList:document.querySelector(".dessert-category-dropdown-list"),dessertList:document.querySelector("[data-dessert-list]"),loadMoreBtn:document.querySelector("[data-load-more]")},i={categories:[O],activeCategory:"",page:1,totalItems:0,isLoading:!1};n.section&&ve();async function ve(){Le(),await V(async()=>{try{const e=await ae();i.categories=ke(e),qe(),await R({replace:!0})}catch(e){N("Не вдалося завантажити десерти. Спробуйте оновити сторінку."),console.error(e)}})}function Le(){var e,t,o,u,s,l;(e=n.radioList)==null||e.addEventListener("change",Se),(t=n.dropdown)==null||t.addEventListener("click",ee),(o=n.dropdown)==null||o.addEventListener("keydown",be),(u=n.dropdownList)==null||u.addEventListener("click",Me),document.addEventListener("click",he),(s=n.loadMoreBtn)==null||s.addEventListener("click",Ee),(l=n.dessertList)==null||l.addEventListener("click",Ce)}function ee(){if(!n.dropdown||!n.dropdownList)return;const e=n.dropdownList.hidden;n.dropdownList.hidden=!e,n.dropdown.classList.toggle("is-open",e),n.dropdown.setAttribute("aria-expanded",String(e))}function T(){!n.dropdown||!n.dropdownList||(n.dropdownList.hidden=!0,n.dropdown.classList.remove("is-open"),n.dropdown.setAttribute("aria-expanded","false"))}function be(e){["Enter"," ","ArrowDown"].includes(e.key)&&(e.preventDefault(),ee()),e.key==="Escape"&&T()}function he(e){!n.dropdown||!n.dropdownList||e.target.closest(".dessert-select-wrap")||T()}async function Me(e){const t=e.target.closest(".dessert-category-dropdown-item");if(!t)return;const o=t.dataset.value;T(),await te(o)}function te(e){if(!(e===i.activeCategory||i.isLoading))return i.activeCategory=e,i.page=1,Oe(),V(async()=>{try{await R({replace:!0})}catch(t){N("Не вдалося завантажити десерти цієї категорії."),console.error(t)}})}async function Se(e){const t=e.target.value;await te(t)}async function Ee(){if(i.isLoading)return;const e=i.page+1;G(!0),await V(async()=>{try{const t=i.page;i.page=e,await R({replace:!1}),i.page=e}catch(t){i.page-=1,N("Не вдалося завантажити наступні десерти."),console.error(t)}}),G(!1)}function Ce(e){const t=e.target.closest(".dessert-card-more");t&&me(t.dataset.id)}function ke(e){const t=new Map(e.map(s=>[s.name,s])),o=z.slice(1).map(s=>t.get(s)).filter(Boolean),u=e.filter(s=>!z.includes(s.name));return[O,...o,...u]}function qe(){const e=[],t=[];for(const o of i.categories)e.push(Ae(o)),t.push($e(o));n.radioList.innerHTML=e.join(""),n.dropdownList.innerHTML=t.join("")}function $e({_id:e,name:t}){return`
    <li
      class="dessert-category-dropdown-item ${oe(e)?"is-active":""}"
      role="option"
      data-value="${f(e)}"
    >
      ${f(t)}
    </li>
  `}function Ae({_id:e,name:t}){return`
    <label class="dessert-category-label">
      <input
        class="dessert-category-input"
        type="radio"
        name="dessert-category"
        value="${f(e)}"
        ${oe(e)?"checked":""}
      />

      <span class="dessert-category-name">
        ${f(t)}
      </span>
    </label>
  `}function oe(e){return e===i.activeCategory}async function R({replace:e}){const t=await re({page:i.page,limit:we,...i.activeCategory&&{category:i.activeCategory}}),o=t.desserts??[];i.totalItems=t.totalItems??o.length,e&&Ie(),n.dessertList.insertAdjacentHTML("beforeend",o.map(Pe).join("")),xe(),Te()}function Pe(e){var o;const t=((o=e.category)==null?void 0:o.name)??"Десерт";return`
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

        ${Be(e._id,e.name)}
      </div>
    </li>
  `}function Be(e,t){return`
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
        <use href="${ye}#icon-arrow-outward"></use>
      </svg>
    </button>
  `}function Ie(){n.dessertList.innerHTML=""}function xe(){const t=n.dessertList.children.length<i.totalItems;n.loadMoreBtn.hidden=!t,n.loadMoreBtn.disabled=i.isLoading||!t}function Oe(){var t;const e=n.radioList.querySelector(`.dessert-category-input[value="${Re(i.activeCategory)}"]`);if(e&&(e.checked=!0),n.dropdownValue){const o=i.categories.find(u=>u._id===i.activeCategory);n.dropdownValue.textContent=o?o.name:O.name}(t=n.dropdownList)==null||t.querySelectorAll(".dessert-category-dropdown-item").forEach(o=>{o.classList.toggle("is-active",o.dataset.value===i.activeCategory)})}function F(e){i.isLoading=e,n.loadMoreBtn.hidden||(n.loadMoreBtn.disabled=e,n.loadMoreBtn.textContent=e?"Завантаження...":"Завантажити ще")}function G(e){n.loadMoreBtn.classList.toggle("is-loading",e),n.loadMoreBtn.setAttribute("aria-busy",String(e))}async function V(e){F(!0);try{await e()}finally{F(!1)}}function N(e){y.error({title:"Помилка",message:e,position:"topRight"})}function Te(){y.destroy()}function f(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Re(e){var t;return(t=window.CSS)!=null&&t.escape?CSS.escape(e):String(e).replaceAll('"','\\"')}const K=document.querySelector(".reviews-swiper .swiper-wrapper");Ve();async function Ve(){try{const{feedbacks:e}=await ce();Ne(e.slice(0,10)),je()}catch(e){console.log(e)}}function Ne(e){if(!K)return;const t=e.map(({rate:o,description:u,author:s})=>`
    <div class="swiper-slide review-card">
    <div class="raterJS" data-rate="${o}"></div>
    <p class="review-paragraph">${u}</p>
    <p class="review-author">${s}</p>
    </div> `).join("");K.innerHTML=t,De()}function je(){new W(".reviews-swiper",{modules:[J,U],slidesPerView:1,breakpoints:{768:{slidesPerView:"auto"}},spaceBetween:24,navigation:{nextEl:".reviews-prev",prevEl:".reviews-next"},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},mousewheel:!0,keyboard:!0})}function De(){document.querySelectorAll(".raterJS").forEach(t=>{Y({element:t,rating:Number(t.dataset.rate)||0,readOnly:!0,starSize:20,step:.5})})}new se(".accordion-container",{duration:400,showMultiple:!1,onlyChildNodes:!1});const h=document.querySelector(".hero-btn");h==null||h.addEventListener("click",()=>{const e=h.dataset.scrollTo,t=document.querySelector(e);t==null||t.scrollIntoView({behavior:"smooth",block:"start"})});
//# sourceMappingURL=index.js.map
