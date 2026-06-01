// LÓGICA DA CORTINA 
const cortina = document.getElementById('cortina');

const esconderCortina = () => {
  cortina.classList.add('escondida');
  // Remove do DOM após a transição para não atrapalhar cliques
  setTimeout(() => cortina.remove(), 700);
};

cortina.addEventListener('click', esconderCortina);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') esconderCortina();
});

// LÓGICA DO RASTRO(Corações)
let alvoX = 0;
let alvoY = 0;
let atualX = 0;
let atualY = 0;
const suavizacao = 0.15;
const mostrarRastro = true;
let ultimoTempoRastro = 0;

window.addEventListener('mousemove', (e) => {
  alvoX = e.clientX;
  alvoY = e.clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  const toque = e.touches[0];
  alvoX = toque.clientX;
  alvoY = toque.clientY;
}, { passive: true });

function animar() {
  // movimento 
  atualX += (alvoX - atualX) * suavizacao;
  atualY += (alvoY - atualY) * suavizacao;

  const agora = performance.now();
  
  // Cria o rastro de corações
  if (mostrarRastro && agora - ultimoTempoRastro > 90 && (Math.hypot(alvoX - atualX, alvoY - atualY) > 8)) {
    ultimoTempoRastro = agora;
    const rastro = document.createElement('div');
    rastro.className = 'rastro';
    rastro.textContent = '💖';
    rastro.style.left = atualX + 'px';
    rastro.style.top = atualY + 'px';
    document.body.appendChild(rastro);
    
    setTimeout(() => rastro.remove(), 650);
  }

  requestAnimationFrame(animar);
}

requestAnimationFrame(animar);

// Resetar posição ao redimensionar tela
window.addEventListener('resize', () => {
  atualX = window.innerWidth / 2;
  atualY = window.innerHeight / 2;
  alvoX = atualX;
  alvoY = atualY;
});