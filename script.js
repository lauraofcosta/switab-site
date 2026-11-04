// Abas do site: mostra uma seção por vez, conforme o endereço (#quem, #loja...)
const secoes=[...document.querySelectorAll('.page')],hd=document.getElementById('hd'),app=document.getElementById('app');
function mostrar(){
  const id=location.hash.slice(1),alvo=secoes.find(s=>s.id===id)||secoes[0];
  secoes.forEach(s=>{s.hidden=s!==alvo;s.classList.remove('in')});
  void alvo.offsetWidth;alvo.classList.add('in');
  hd.className='hd '+alvo.dataset.c;
  document.querySelectorAll('.tab').forEach(t=>{const on=t.dataset.t===alvo.id;t.classList.toggle('on',on);if(on){t.setAttribute('aria-current','page');t.scrollIntoView({block:'nearest',inline:'center'})}else t.removeAttribute('aria-current')});
  window.scrollTo(0,0);
}
// No computador o desenho é ajustado à largura da janela
function ajustar(){
  const w=document.documentElement.clientWidth;
  app.style.zoom=w>=1000?w/1440:'';
}
addEventListener('hashchange',mostrar);addEventListener('resize',ajustar);ajustar();mostrar();
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
