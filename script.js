// Abas do site: mostra uma seção por vez, conforme o endereço (#quem, #loja...)
const secoes=[...document.querySelectorAll('.page')],hd=document.getElementById('hd'),app=document.getElementById('app');
function mostrar(){
  const id=location.hash.slice(1),el=id&&document.getElementById(id),alvo=(el&&el.closest('.page'))||secoes[0];
  const mudou=alvo.hidden;
  secoes.forEach(s=>{s.hidden=s!==alvo;if(mudou)s.classList.remove('in')});
  if(mudou||!alvo.classList.contains('in')){void alvo.offsetWidth;alvo.classList.add('in')}
  hd.className='hd '+alvo.dataset.c.split(' ')[0];
  document.querySelectorAll('.tab').forEach(t=>{const on=t.dataset.t===alvo.id;t.classList.toggle('on',on);if(on){t.setAttribute('aria-current','page');t.scrollIntoView({block:'nearest',inline:'center'})}else t.removeAttribute('aria-current')});
  const dentro=el&&el!==alvo;
  const ir=()=>dentro?el.scrollIntoView():window.scrollTo(0,0);
  ir();requestAnimationFrame(ir);
  contar();
}
// No computador o desenho é ajustado à largura da janela
function ajustar(){
  const w=document.documentElement.clientWidth;
  app.style.zoom=w>=1000?w/1440:'';
}
addEventListener('hashchange',mostrar);addEventListener('resize',ajustar);ajustar();
// Links para fora abrem em outra aba
document.querySelectorAll('a[href^="http"]').forEach(a=>{a.target='_blank';a.rel='noopener'});
// Filtro de oportunidades
const mapa={eventos:'evento',cursos:'curso',bolsas:'bolsa',visitas:'visita',carreira:'carreira'};
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));
  const f=mapa[c.dataset.f];
  document.querySelectorAll('.op').forEach(o=>o.classList.toggle('off',!!f&&o.dataset.k!==f));
  document.querySelector('.prompt b').textContent='oportunidades --filtro '+c.dataset.f;
}));

// Números que sobem quando aparecem na tela
const semMov=matchMedia('(prefers-reduced-motion:reduce)').matches;
const obs=semMov||!('IntersectionObserver' in window)?null:new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;obs.unobserve(e.target);
  const n=+e.target.dataset.n,t0=performance.now();
  (function p(t){const k=Math.min(1,(t-t0)/1100);e.target.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(p)})(t0);
}));
function contar(){if(obs)document.querySelectorAll('.count').forEach(c=>obs.observe(c))}
// Cadeia de mentoria
const passos=document.querySelectorAll('.st'),textos=document.querySelectorAll('.stp p');
passos.forEach((b,i)=>b.addEventListener('click',()=>{passos.forEach((x,j)=>x.classList.toggle('on',j===i));textos.forEach((x,j)=>x.classList.toggle('on',j===i))}));
// Cronograma: mês e tipo
let mes='mai',tipo='todos';
function filtrarEv(){let n=0;document.querySelectorAll('.ev').forEach(e=>{const v=e.dataset.m===mes&&(tipo==='todos'||e.dataset.t===tipo);e.hidden=!v;if(v)n++});document.querySelector('.ev-vazio').hidden=n>0}
document.querySelectorAll('.mes').forEach(b=>b.addEventListener('click',()=>{mes=b.dataset.m;document.querySelectorAll('.mes').forEach(x=>x.classList.toggle('on',x===b));filtrarEv()}));
document.querySelectorAll('.tp').forEach(b=>b.addEventListener('click',()=>{tipo=b.dataset.t;document.querySelectorAll('.tp').forEach(x=>x.classList.toggle('on',x===b));filtrarEv()}));
filtrarEv();
// Depoimentos
document.querySelectorAll('.dfb').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.dfb').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.dep').forEach(d=>d.hidden=b.dataset.f!=='todas'&&d.dataset.f!==b.dataset.f)}));
// Escolha do papel preenche o formulário
const form=document.getElementById('form');
function marcarPapel(r){document.querySelectorAll('.role').forEach(x=>x.classList.toggle('on',x.dataset.r===r))}
document.querySelectorAll('.role').forEach(b=>b.addEventListener('click',()=>{form.papel.value=b.dataset.r;marcarPapel(b.dataset.r)}));
form.papel.addEventListener('change',()=>marcarPapel(form.papel.value));
form.addEventListener('submit',e=>{e.preventDefault();const f=form,corpo=`Nome: ${f.nome.value}\nE-mail acadêmico: ${f.email.value}\nPeríodo de ingresso: ${f.periodo.value}\nJá participou? ${f.ja.value}\nComo quer participar em 2026: ${f.papel.value}\n\nMotivação:\n${f.mot.value}`;
  location.href='mailto:switabproject@gmail.com?subject='+encodeURIComponent('Inscrição SWITAB 2026: '+f.papel.value)+'&body='+encodeURIComponent(corpo)});
// Foto ampliada
const lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.innerHTML='<img alt="">';document.body.append(lb);
document.querySelectorAll('.pol img').forEach(i=>i.addEventListener('click',()=>{lb.firstChild.src=i.src;lb.hidden=false}));
lb.addEventListener('click',()=>lb.hidden=true);addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
mostrar();
