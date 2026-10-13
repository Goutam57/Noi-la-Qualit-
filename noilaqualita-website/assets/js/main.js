(function(){
'use strict';

/* LOADER — only show first visit per session */
const loader=document.getElementById('loader');
if(loader){
let alreadyShown=false;
try{alreadyShown=sessionStorage.getItem('nq-loader-shown')==='1';}catch(e){}
if(alreadyShown){
loader.remove();
document.body.classList.remove('no-scroll');
}else{
try{sessionStorage.setItem('nq-loader-shown','1');}catch(e){}
window.addEventListener('load',()=>{
setTimeout(()=>{
loader.classList.add('hidden');
document.body.classList.remove('no-scroll');
setTimeout(()=>loader.remove(),700);
},1600);
});
setTimeout(()=>{
if(document.body.contains(loader)&&!loader.classList.contains('hidden')){
loader.classList.add('hidden');
document.body.classList.remove('no-scroll');
}
},2600);
}
}

/* HEADER SCROLL */
const header=document.getElementById('siteHeader');
const backToTop=document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
const y=window.scrollY;
if(y>40)header?.classList.add('scrolled');
else header?.classList.remove('scrolled');
if(y>600)backToTop?.classList.add('visible');
else backToTop?.classList.remove('visible');
},{passive:true});
backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* MOBILE MENU */
const mobileToggle=document.getElementById('mobileToggle');
const mobileMenu=document.getElementById('mobileMenu');
const mobileClose=document.getElementById('mobileClose');
mobileToggle?.addEventListener('click',()=>{mobileMenu?.classList.add('open');document.body.classList.add('no-scroll');});
mobileClose?.addEventListener('click',()=>{mobileMenu?.classList.remove('open');document.body.classList.remove('no-scroll');});
document.querySelectorAll('.mobile-nav a,.mobile-menu-contact a').forEach(link=>{
link.addEventListener('click',()=>{mobileMenu?.classList.remove('open');document.body.classList.remove('no-scroll');});
});

/* FILTER TABS */
const tabs=document.querySelectorAll('.filter-tab');
const cards=document.querySelectorAll('.product-card');
tabs.forEach(tab=>{
tab.addEventListener('click',()=>{
tabs.forEach(t=>t.classList.remove('active'));
tab.classList.add('active');
const filter=tab.dataset.filter;
cards.forEach((card,idx)=>{
if(filter==='all'||card.dataset.category===filter){
card.style.display='flex';
card.style.opacity='0';
card.style.transform='translateY(30px)';
setTimeout(()=>{
card.style.transition='opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)';
card.style.opacity='1';
card.style.transform='translateY(0)';
},40*idx);
}else card.style.display='none';
});
});
});

/* FAVOURITE */
document.querySelectorAll('.product-fav').forEach(btn=>{
btn.addEventListener('click',(e)=>{
e.preventDefault();e.stopPropagation();
const icon=btn.querySelector('i');
btn.classList.toggle('active');
if(btn.classList.contains('active')){icon.classList.remove('far');icon.classList.add('fas');}
else{icon.classList.remove('fas');icon.classList.add('far');}
});
});

/* LIGHTBOX */
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const lightboxTitle=document.getElementById('lightboxTitle');
const lightboxDesc=document.getElementById('lightboxDesc');
const lightboxCat=document.getElementById('lightboxCat');
const lightboxClose=document.getElementById('lightboxClose');
const lightboxCode=document.getElementById('lightboxCode');
const lightboxSize=document.getElementById('lightboxSize');
const lightboxOrigin=document.getElementById('lightboxOrigin');

function openLightbox(data){
if(!lightbox)return;
lightboxImg.src=data.src||'';
lightboxImg.alt=data.title||'';
lightboxCat.textContent=data.category||'';
lightboxTitle.textContent=data.title||'';
lightboxDesc.textContent=data.desc||'';
if(lightboxCode)lightboxCode.textContent=data.code||'—';
if(lightboxSize)lightboxSize.textContent=data.size||'—';
if(lightboxOrigin)lightboxOrigin.textContent=data.origin||'—';
lightbox.classList.add('open');
document.body.classList.add('no-scroll');
}
function closeLightbox(){
if(!lightbox)return;
lightbox.classList.remove('open');
document.body.classList.remove('no-scroll');
}
document.querySelectorAll('[data-lightbox]').forEach(el=>{
el.addEventListener('click',()=>{
const data={
src:el.dataset.src||el.querySelector('img')?.src||'',
title:el.dataset.title||'',
desc:el.dataset.desc||'',
category:el.dataset.category||'',
code:el.dataset.code||'',
size:el.dataset.size||'',
origin:el.dataset.origin||''
};
openLightbox(data);
});
});
lightboxClose?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',(e)=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&lightbox?.classList.contains('open'))closeLightbox();});

/* SMOOTH ANCHOR */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener('click',function(e){
const href=this.getAttribute('href');
if(href==='#'||href==='')return;
const target=document.querySelector(href);
if(target){
e.preventDefault();
const offset=110;
const top=target.getBoundingClientRect().top+window.pageYOffset-offset;
window.scrollTo({top,behavior:'smooth'});
}
});
});

/* INIT LANG */
let savedLang='it';
try{savedLang=localStorage.getItem('nq-lang')||'it';}catch(e){}
if(typeof applyLanguage==='function')applyLanguage(savedLang);
})();
