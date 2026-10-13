(function(){
'use strict';
const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-zoom');
const revealObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
});
},{threshold:.12,rootMargin:'0px 0px -60px 0px'});
revealEls.forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll('.counter');
if(counters.length){
const counterObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const el=entry.target;
const target=parseInt(el.dataset.target,10);
const duration=1800;
const start=performance.now();
function tick(now){
const elapsed=now-start;
const progress=Math.min(elapsed/duration,1);
const eased=1-Math.pow(1-progress,4);
el.textContent=Math.floor(target*eased);
if(progress<1)requestAnimationFrame(tick);
else el.textContent=target;
}
requestAnimationFrame(tick);
counterObserver.unobserve(el);
}
});
},{threshold:.5});
counters.forEach(c=>counterObserver.observe(c));
}
})();
