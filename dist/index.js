(()=>{var y=(r,c=!0)=>r.cloneNode(c),o=y;function d(r){var g;let x=(g=document.querySelector(".etf-sub-1").textContent)==null?void 0:g.split(" ")[1],m=document.querySelector(".holdings-date"),h=document.querySelector("[holdings]"),u=document.querySelector("[holdings] > div:not(.row-4)"),f=o(u);u.remove(),window.Papa.parse(r,{download:!0,complete:({data:E})=>{let p=[];E.forEach(([s,t,,a,l,i,,,e])=>{t===x&&p.push({Date:s,CUSIP:a,SecurityName:l,Shares:i,Weightings:e})});let n=0;for(let[s,{Date:t,SecurityName:a,Shares:l,Weightings:i}]of p.entries()){if(s===10)break;m.textContent!==t&&(m.textContent=t);let e=o(f),S=e.querySelector("[security]");S.textContent=a;let T=e.querySelector("[share]");T.textContent=l;let w=e.querySelector("[weighting]");w.textContent=i,n===0?n+=1:(n-=1,e.classList.replace("row-5","row-6")),h.insertAdjacentElement("beforeend",e)}f.remove()}})}document.addEventListener("DOMContentLoaded",()=>{d("https://d9qw5r0kv9equ.cloudfront.net/PacificGlobal.40XY.XY_Holdings.csv")});})();
