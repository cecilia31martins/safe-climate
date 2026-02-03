const QUESTIONS = [
  { q: 'Qual desses animais é típico da Amazônia?', a: ['Arara Azul','Pinguim','Camelo','Coiote'], correct: 0 },
  { q: 'Qual bioma brasileiro é conhecido por grandes alagamentos?', a: ['Caatinga','Pantanal','Pampas','Cerrado'], correct: 1 },
  { q: 'Qual está ameaçado de extinção?', a: ['Tilápia','Galinha','Onça-pintada','Pombo'], correct: 2 },
  { q: 'Qual atitude ajuda o meio ambiente?', a: ['Queimar lixo','Usar descartáveis','Economizar água','Desmatar'], correct: 2 },
  { q: 'Qual rio é importante na Amazônia?', a: ['Nilo','Tocantins','Mississippi','Yantze'], correct: 1 },
  { q: 'Qual das opções é árvore?', a: ['Jacarandá','Tartaruga','Golfinho','Sabiá'], correct: 0 },
  { q: 'Qual ação ajuda a reduzir o aquecimento global?', a: ['Plantar árvores','Desmatar','Jogar plástico no rio','Usar carvão'], correct: 0 },
  { q: 'Qual ave é conhecida por sua visão poderosa?', a: ['Pombo','Águia','Pato','Coruja-do-mato'], correct: 1 },
  { q: 'O que causa a erosão do solo?', a: ['Desmatamento','Arco-íris','Neve','Noite'], correct: 0 },
  { q: 'Qual desses animais é um mamífero?', a: ['Sardinha','Tubarão','Baleia','Atum'], correct: 2 },
  { q: 'Qual é a principal causa da poluição dos oceanos?', a: ['A chuva ácida','O descarte incorreto de plásticos','A falta de oxigênio na água','A evaporação da água do mar'], correct: 1 },
  { q: 'Qual gás é responsável pelo aquecimento global?', a: ['Oxigênio','Hidrogênio','CO₂','Hélio'], correct: 2 },
  { q: 'O que é biodiversidade?', a: ['Quantidade de lixo','Variedade de espécies vivas','Número de rios','Área de floresta'], correct: 1 },
  { q: 'Qual prática reduz plástico?', a: ['Usar canudo só sábado','Trocar por papel sempre','Reutilizar embalagens','Queimar lixo'], correct: 2 },
  { q: 'Por que o desmatamento aquece o planeta?', a: ['Diminui chuvas','Libera CO₂ das árvores','Aumenta animais','Esfria o solo'], correct: 1 }
];

const RECYCLE_ITEMS = [
  { name:'Papel', type:'papel', emoji:'📄' },
  { name:'Maçã', type:'organico', emoji:'🍎' },
  { name:'Caderno', type:'papel', emoji:'📘' },
  { name:'Sacola', type:'papel', emoji:'🛍️' },
  { name:'Canudo', type:'plastico', emoji:'🧃' },
  { name:'Garrafa de vidro', type:'vidro', emoji:'🍾' },
  { name:'Folhas', type:'organico', emoji:'🥬' },
  { name:'Envelope', type:'papel', emoji:'✉️' },
  { name:'Copo de vidro', type:'vidro', emoji:'🥃' },
  { name:'Garrafa PET', type:'plastico', emoji:'🥤' },
  { name:'Banana', type:'organico', emoji:'🍌' },
  { name:'Garrafa plástica', type:'plastico', emoji:'🧴' },
  { name:'Jornal', type:'papel', emoji:'📰' },
  { name:'Prato', type:'vidro', emoji:'🍽️' }
];


let index = 0; 
let score = 0;  


function currentLevelAndPoints(idx) { 
  if (idx < 5) return { level: 1, points: 5 }; 
  if (idx < 10) return { level: 2, points: 10 };
  return { level: 3, points: 20 };
} 


function ensureHeaderElements() {
  const top = document.querySelector(".quiz-top");
  if (!top) return;

  let lvl = document.getElementById("levelLabel");
  let prog = document.getElementById("progressLabel");  

  if (!lvl || !prog) {
    top.innerHTML = "";

    lvl = document.createElement("span");
    lvl.id = "levelLabel";
    lvl.style.fontWeight = "bold";

    prog = document.createElement("span");
    prog.id = "progressLabel";
    prog.style.fontWeight = "bold";

    const scoreContainer = document.createElement("span");
    scoreContainer.innerHTML = 'Pontos: <span id="score">0</span>';
    scoreContainer.style.fontWeight = "bold";

    top.appendChild(lvl);
    top.appendChild(prog);
    top.appendChild(scoreContainer);
  }
}


function show(screen) { 
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screen).classList.add("active");

  document.body.style.backgroundImage =
    screen === "quiz"
      ? 'url("/Arquivos/fc.png")'
      : 'url("Arquivos/ff.png")';
}

//início
document.addEventListener("DOMContentLoaded", () => {
  ensureHeaderElements();

  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.onclick = () => {
      index = 0;
      score = 0;
      updateQuiz();
      show("quiz");
    };
  }

  attachBins();
});

//atualizar quiz
function updateQuiz() {
  ensureHeaderElements();

  if (index >= QUESTIONS.length) {
    startRecycle();
    return;
  }

  const q = QUESTIONS[index];
  const lvl = currentLevelAndPoints(index);

  document.getElementById("levelLabel").textContent = `Nível ${lvl.level}`;
  document.getElementById("progressLabel").textContent = `Pergunta ${index + 1}/${QUESTIONS.length}`;
  document.getElementById("score").textContent = score;
  document.getElementById("qtext").textContent = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answerBtn";
    btn.innerText = text;
    btn.onclick = () => checkAnswer(i, btn);
    answersDiv.appendChild(btn);
  });
}

//verificar questões
function checkAnswer(choice, btn) {
  const q = QUESTIONS[index];
  const lvl = currentLevelAndPoints(index);
  const buttons = document.querySelectorAll(".answerBtn");

  buttons.forEach(b => b.disabled = true);

  if (choice === q.correct) {
    score += lvl.points;
    btn.classList.add("correct");
    document.getElementById("feedback").textContent = `✔ Acertou! +${lvl.points} pontos`;
  } else {
    btn.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
    document.getElementById("feedback").textContent = "❌ Errado!";
  }

  document.getElementById("score").textContent = score;
  index++;

  setTimeout(updateQuiz, 900);
}

//reciclagem
function startRecycle() {
  show("recycle");

  const div = document.getElementById("itemsArea");
  div.innerHTML = "";

  RECYCLE_ITEMS.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "trash-item";
    el.draggable = true;
    el.dataset.type = item.type;
    el.dataset.id = "trash_" + i;
    el.innerText = item.emoji;

    el.ondragstart = ev => {
      ev.dataTransfer.setData("id", el.dataset.id);
      ev.dataTransfer.setData("type", el.dataset.type);
    };

    div.appendChild(el);
  });

  document.getElementById("recycleFeedback").innerText = "";
}

//lixeiras

function attachBins() {
  const bins = document.querySelectorAll(".bin-card");

  bins.forEach(bin => {
    bin.ondragover = e => e.preventDefault();

    bin.ondrop = e => {
      e.preventDefault();

      const id = e.dataTransfer.getData("id");
      const type = e.dataTransfer.getData("type");
      const el = document.querySelector(`[data-id="${id}"]`);
      const fb = document.getElementById("recycleFeedback");

      if (!el) return;

      if (type === bin.dataset.type) {
        el.remove();
        fb.innerText = "✔ Muito bem!";
      } else {
        score = Math.max(0, score - 5);
        document.getElementById("score").textContent = score;
        fb.innerText = "❌ Lixeira errada! -5 pontos";
      }
    };
  });
}
