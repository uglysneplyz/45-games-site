'use strict';
const R=(k,x,y,w,h,r=4,e='')=>`<rect class="${k}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${e}/>`,
C=(k,x,y,r,e='')=>`<circle class="${k}" cx="${x}" cy="${y}" r="${r}" ${e}/>`,
P=(k,d,e='')=>`<path class="${k}" d="${d}" ${e}/>`,
T=(x,y,s,t,k='')=>`<text class="${k}" x="${x}" y="${y}" style="font-size:${s}px">${t}</text>`,
Q=(a,s)=>a.map(([k,t],i)=>{const x=10+i%2*42,y=10+(i>>1)*42;return R(k,x,y,38,38,9)+T(x+19,y+19+s*.36,s,t)}).join(''),
G=(n,f)=>[...Array(n)].map((_,i)=>f(i)).join(''),
STAR='M50 6l12 31 33 2-26 21 9 32-28-18-28 18 9-32L5 39l33-2z',SPK='M0-9Q1-1 9 0Q1 1 0 9Q-1 1-9 0Q-1-1 0-9z';
const ICONS={
rider:P('c','M12 68l9-24q4-10 14-10h30q10 0 14 10l9 24v14H12z')+P('b','M27 46l4-8h38l4 8z')+C('a',27,66,6)+C('a',73,66,6)+R('d',38,58,24,6,3)+R('k',16,78,18,14,5)+R('k',66,78,18,14,5),
snake:P('sc t','M18 80h42a14 14 0 000-28H40a14 14 0 010-28h36')+C('c',78,24,11)+C('k',81,21,2.6)+C('a',84,80,7),
merge:Q([['c','2'],['a','4'],['w','8'],['c','16']],24),
stack:G(3,i=>{const y=56-i*20,s=`M84 ${y+13}l-34 13v12l34-13z`;return `<g transform="translate(${i==2?6:0} 0)">`+P(i%2?'w':'c',`M50 ${y}l34 13-34 13-34-13z`)+P('a',`M16 ${y+13}l34 13v12l-34-13z`)+P('a',s)+P('d',s)+'</g>'}),
breakout:G(3,i=>R(i%2?'a':'c',10+i*28,14,24,12,3))+G(2,i=>R(i%2?'c':'a',24+i*28,30,24,12,3))+P('sw','M40 80l14-12','opacity=".4"')+C('w',60,62,6)+R('c',30,84,40,8,4),
flappy:C('c',46,52,28)+P('a','M24 58q14 14 28-2-8-14-28 2z')+C('w',60,42,9)+C('k',63,42,4)+P('a','M72 50l20 6-20 8z')+P('sw','M6 38h14M2 54h12','opacity=".4"'),
memory:'<g transform="rotate(-10 30 49)">'+R('a',10,22,40,54,8)+T(30,58,28,'?')+'</g><g transform="rotate(10 70 49)">'+R('c',50,22,40,54,8)+P('b',STAR,'transform="translate(56 34) scale(.3)"')+'</g>',
space:P('c','M50 8c14 14 18 34 14 56H36C32 42 36 22 50 8z')+P('d','M50 8c14 14 18 34 14 56H50z')+C('b',50,36,8)+P('a','M36 50L20 70l18-4zM64 50l16 20-18-4z')+P('a','M42 70h16l-8 24z'),
pong:P('sc','M50 8v84','stroke-dasharray="6 8" opacity=".35"')+R('c',12,26,10,40,5)+R('a',78,40,10,40,5)+C('w',56,48,7),
mines:P('sc t','M50 10v80M10 50h80M22 22l56 56M78 22L22 78')+C('c',50,50,24)+C('w',42,42,6),
tetris:[[24,14],[44,14],[64,14],[44,34]].map(([x,y])=>R('c',x,y,18,18,4)).join('')+[[24,58],[24,78],[44,78],[64,78]].map(([x,y])=>R('a',x,y,18,18,4)).join('')+R('w',64,58,18,18,4),
aim:C('c',46,54,36)+C('b',46,54,26)+C('c',46,54,16)+C('a',46,54,7)+P('sw','M48 52l34-34')+P('sa','M74 26l6-12M74 26l12-6'),
whack:P('d','M16 78a34 10 0 1068 0a34 10 0 10-68 0')+P('c','M26 78v-8a24 26 0 0148 0v8z')+C('k',40,58,4)+C('k',60,58,4)+C('a',50,67,6)+P('k','M14 78q36 22 72 0v8q-36 20-72 0z'),
reaction:P('d','M58 6L22 56h24l-6 38 38-54H54z','transform="translate(5 5)"')+P('c','M58 6L22 56h24l-6 38 38-54H54z'),
simon:P('c','M54 46V8A38 38 0 0192 46z')+P('a','M54 54H92A38 38 0 0154 92z')+P('w','M46 54V92A38 38 0 018 54z')+P('c','M46 46H8A38 38 0 0146 8z','opacity=".5"'),
tic:P('sw th','M10 52h80M52 10v80','opacity=".25"')+P('sc t','M14 14l30 30M44 14L14 44')+C('sa t',68,68,18),
connect:R('a',8,14,84,72,12)+G(12,i=>C([['b','b','b','b'],['b','b','c','b'],['c','w','w','c']].flat()[i],22+i%4*19,32+(i>>2)*18,7.5)),
slide:G(8,i=>R(i%2?'a':'c',10+i%3*30,10+(i/3|0)*30,26,26,6)+T(23+i%3*30,29+(i/3|0)*30,16,i+1)),
sudoku:R('c',12,12,76,76,10)+P('sb th','M38 12v76M62 12v76M12 38h76M12 62h76')+T(25,32,20,'5')+T(75,57,20,'3')+T(50,82,20,'7')+T(25,82,20,'9'),
lights:G(9,i=>R('c',10+i%3*30,10+(i/3|0)*30,26,26,8,[0,1,0,1,1,1,0,1,0][i]?'':'opacity=".22"')),
maze:R('sc',12,12,76,76,12)+P('sc','M12 36h46M74 36h14M34 62h38M34 62V48M72 62v26')+C('a',24,24,5)+C('w',80,76,6),
word:Q([['c','И'],['a','Г'],['w','Р'],['c','А']],26),
hang:P('sc','M12 82h20M40 82h20M68 82h20')+T(22,68,36,'А','l')+T(50,68,36,'?','m')+T(78,68,36,'Я','l'),
typing:R('w blink',44,8,5,14,2)+R('a',8,26,84,52,10)+G(5,i=>R('c',16+i*15,34,11,11,3))+G(4,i=>R('c',23+i*15,49,11,11,3))+R('c',28,64,44,8,3),
math:Q([['c','+'],['a','−'],['a','×'],['c','÷']],34),
color:'<g style="mix-blend-mode:screen">'+C('c',38,40,28)+C('a',62,40,28)+C('w',50,62,28,'opacity=".5"')+'</g>',
numbers:[[30,30,20,'1','c'],[72,26,15,'2','a'],[74,68,20,'3','c'],[26,72,15,'4','a']].map(([x,y,r,t,k])=>C(k,x,y,r)+T(x,y+r*.4,r*1.1,t)).join(''),
sequence:P('sc th','M19 26q31-18 62 0m-9-8l9 8-12 4')+R('c',6,36,26,28,7)+T(19,56,20,'2')+R('c',37,36,26,28,7)+T(50,56,20,'4')+R('a',68,36,26,28,7)+T(81,56,20,'?'),
higher:R('c',22,8,56,84,10)+P('a','M50 18l15 19H35z')+P('b','M50 82L35 63h30z')+T(50,59,24,'?'),
rps:P('sc t','M32 12l36 50M68 12L32 62')+C('sa',28,76,12)+C('sa',72,76,12),
dice:'<g transform="rotate(-12 50 50)">'+R('c',16,16,68,68,16)+[[34,34],[66,34],[50,50],[34,66],[66,66]].map(([x,y])=>C('b',x,y,6.5)).join('')+'</g>',
catch:P('c',STAR,'transform="translate(10 4) scale(.8)"')+P('a',STAR,'transform="translate(62 58) scale(.3)"')+P('w',STAR,'transform="translate(2 56) scale(.26)"'),
asteroid:P('sa','M4 26h16M2 44h12M10 62h14')+P('c','M26 38l16-18 24 4 18 18-4 24-20 16-26-4-12-20z')+C('d',44,42,6)+C('d',64,58,9)+C('d',38,66,4),
orbit:'<ellipse class="sa" cx="50" cy="50" rx="40" ry="18" transform="rotate(-25 50 50)"/>'+C('c',50,50,16)+C('a',45,45,5)+C('w',87,39,6),
jumper:C('c',34,68,14)+C('c',54,58,20)+C('c',74,70,12)+R('c',24,66,60,16,8)+C('a',50,20,10)+C('k',46,18,2.2)+C('k',54,18,2.2),
slice:P('a','M8 46a42 42 0 0084 0z')+P('c','M17 46a33 33 0 0066 0z')+C('b',34,58,3.5)+C('b',50,66,3.5)+C('b',66,58,3.5)+P('sw','M6 14l88 46'),
golf:P('a','M10 80a40 10 0 1080 0a40 10 0 10-80 0')+P('k','M32 80a8 3 0 1016 0a8 3 0 10-16 0')+P('sw','M40 80V14')+P('c','M40 14l32 11-32 11z')+C('w',72,72,7),
pinball:C('a',34,30,12)+C('c',68,24,9)+C('w',52,52,6)+R('c',16,70,34,10,5,'transform="rotate(22 16 70)"')+R('a',50,70,34,10,5,'transform="rotate(-22 84 70)"'),
defense:P('c','M50 8l28 28-28 56L22 36z')+P('a','M50 8l28 28H22z')+P('d','M50 36h28L50 92z')+P('w','M34 36l16-14 6 14z','opacity=".5"'),
soko:R('c',16,16,68,68,8)+P('sb','M28 28l44 44M72 28L28 72')+R('sa',16,16,68,68,8),
reversi:C('w',34,60,26)+C('k',66,60,26)+P('sa','M24 24q26-18 52 0m-10-10l10 10-14 6'),
flood:G(9,i=>R(['c','c','a','c','a','w','a','w','w'][i],10+i%3*28,10+(i/3|0)*28,26,26,6)),
code:G(4,i=>C(['c','a','w','a'][i],20+i*20,30,9))+G(4,i=>C('sc th',20+i*20,58,9))+C('a',20,58,9)+C('c',40,58,9),
rhythm:G(4,i=>R('d',12+i*22,10,18,80,6))+R('c',12,22,18,12,4)+R('a',56,46,18,12,4)+R('c',34,62,18,12,4)+R('w',78,14,18,12,4)+R('w',10,80,88,4,2),
battle:C('sc',50,20,8)+P('sc','M50 28v58M30 46h40M16 62a34 34 0 0068 0')+P('sc','M16 62l-5-8M84 62l5-8')
};
const U=(d,f='none')=>`<svg class="ui" viewBox="0 0 24 24" fill="${f}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const HEART='<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.7A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>';
const UI={grid:U('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),heart:U(HEART),heartOn:U(HEART,'currentColor'),clock:U('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),search:U('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),note:U('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),shuffle:U('<path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3"/>'),restart:U('<path d="M20 12a8 8 0 11-3-6.2M20 4v5h-5"/>'),close:U('<path d="M6 6l12 12M18 6L6 18"/>'),spark:U('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>','currentColor'),play:U('<path d="M7 4l13 8-13 8z"/>','currentColor'),arcade:U('<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><path d="M16 11h.01M18.5 14h.01"/>'),puzzle:U('<path d="M4 8h4a2 2 0 114 0h4v4a2 2 0 110 4v4H4z"/>'),bolt:U('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),dice:U('<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 8h.01M16 16h.01M12 12h.01"/>'),ball:U('<circle cx="12" cy="12" r="9"/><path d="M5 6c4 2 10 2 14 0M5 18c4-2 10-2 14 0M12 3v18"/>'),abc:'<svg class="ui" viewBox="0 0 24 24"><text x="12" y="17" font-size="13" font-weight="800" fill="currentColor" text-anchor="middle">Aa</text></svg>'};
function artwork(g){const [bg,c,a]=palettes[g.palette],i=g.index;
const sp=[[44,36,1],[258,40,1.3],[252,152,.8],[36,148,1.1]].map(([x,y,s],k)=>`<path class="spk" style="animation-delay:${-(i+k)%3}s" transform="translate(${x} ${y}) scale(${s})" d="${SPK}" fill="${c}"/>`).join('');
return `<svg class="ic" viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="--bg:${bg};--c:${c};--a:${a}"><defs><radialGradient id="rg${i}" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="${a}" stop-opacity=".45"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient><pattern id="grid${i}" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="#fff" stroke-opacity=".04"/></pattern></defs><rect width="300" height="190" fill="${bg}"/><rect width="300" height="190" fill="url(#rg${i})"/><rect width="300" height="190" fill="url(#grid${i})"/><text class="num" x="290" y="182">${String(i+1).padStart(2,'0')}</text><g class="ring"><circle cx="150" cy="95" r="74" fill="none" stroke="${c}" stroke-opacity=".2" stroke-dasharray="3 9" stroke-width="2"/></g><circle cx="150" cy="95" r="58" fill="none" stroke="${a}" stroke-opacity=".25"/>${sp}<g transform="translate(70 15) scale(1.6)"><g class="ico-in" style="animation-delay:${-(i%5)}s">${ICONS[g.id]}</g></g></svg>`}
const miniIcon=g=>{const [bg,c,a]=palettes[g.palette];return `<span class="mi" style="--bg:${bg};--c:${c};--a:${a}"><svg class="ic" viewBox="0 0 100 100">${ICONS[g.id]}</svg></span>`};
function buildTicker(){const h=catalog.map(g=>`<div class="chip" data-launch="${g.id}">${miniIcon(g)}${g.name}</div>`).join('');document.getElementById('ticker').innerHTML=`<div class="ticker-track">${h+h}</div>`}
var cele=0;
function confetti(p){const d=document.getElementById('gameDialog');for(let i=0;i<40;i++){const e=document.createElement('i'),t=Math.random()*6.28,s=120+Math.random()*260;e.className='cf';e.style.cssText=`--x:${Math.cos(t)*s}px;--y:${Math.sin(t)*s-60}px;--r:${Math.random()*720-360}deg;--k:${[p[1],p[2],'#f4f0e1','#d4f879'][i%4]}`;d.append(e);setTimeout(()=>e.remove(),1600)}}
document.addEventListener('pointermove',e=>{const a=e.target.closest&&e.target.closest('.card-art');if(!a||e.pointerType==='touch')return;const r=a.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height,s=a.style;s.setProperty('--ry',(x-.5)*10+'deg');s.setProperty('--rx',(.5-y)*8+'deg');s.setProperty('--mx',x*100+'%');s.setProperty('--my',y*100+'%')});
document.addEventListener('pointerout',e=>{const a=e.target.closest&&e.target.closest('.card-art');if(a&&!a.contains(e.relatedTarget)){a.style.setProperty('--rx','0deg');a.style.setProperty('--ry','0deg')}});
document.querySelectorAll('[data-i]').forEach(e=>e.outerHTML=UI[e.dataset.i]);
