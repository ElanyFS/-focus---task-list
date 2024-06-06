const controlesInterface = document.querySelectorAll(
  ".conteudo_controle_button"
);
// data-interface do html
const html = document.querySelector("html");

// Titulo principal da pagina
const titulo = document.querySelector(".apresentacao_titulo_texto");

// Relogio de cada pagina
const temporizador = document.querySelector(".controle_conteudo_timer");

let tempoSegundos = 1500;
let intervalo = null;
// Imagem referente a cada pagina
const imagem = document.querySelector(".apresentacao_imagem_imagem");

// botao de inicio do cronometro
const botaoStartOnPause = document.querySelector("#botaoStart");
const botaoReiniciar = document.querySelector("#botaoReiniciar");
const startPauseCont = document.querySelector(
  ".controle_conteudo_button_texto"
);

// Musica
const botaoMusica = document.querySelector("#alterar-musica");

const musica = new Audio("/assets/sons/lunaAudio.mp3");
musica.loop = true;

const musicaPlayStart = new Audio("/assets/sons/sons_play.wav");
const musicaStop = new Audio("/assets/sons/sons_pause.mp3");
const musicaTimeFinished = new Audio("/assets/sons/sons_beep.mp3");

// funcoes de click para cada botao - laterar cor e valores
controlesInterface.forEach((controle) => {
  controle.addEventListener("click", () => {
    const valorButton = controle.getAttribute("data-conteudo");
    alterarConteudo(valorButton);
    controle.classList.add("active");
  });
});

function alterarConteudo(valorInterface) {
  controlesInterface.forEach(function (valorInterface) {
    valorInterface.classList.remove("active");
  });
  html.setAttribute("data-interface", valorInterface);
  imagem.setAttribute("src", `/assets/img/${valorInterface}.png`);

  switch (valorInterface) {
    case "foco":
      titulo.innerHTML = `Maximize sua produtividade, <strong class='apresentacao_titulo_destaque'>concentre-se no essencial.</strong>`;
      // temporizador.textContent = `25:00`;
      tempoSegundos = 1500;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal respirar um pouco? <strong class='apresentacao_titulo_destaque'>Faça uma breve pausa.</strong>`;
      // temporizador.textContent = `05:00`;
      tempoSegundos = 300;
      break;
    case "descanso-longo":
      titulo.innerHTML = `É hora de voltar à superfície. <strong class='apresentacao_titulo_destaque'>Faça uma pausa prolongada.</strong>`;
      // temporizador.textContent = `15:00`;
      tempoSegundos = 900;
      break;
    default:
      break;
  }

  mostrarTempo();
}

const tempoContagem = () => {
  if (tempoSegundos <= 0) {
    
    zerar();
    musicaTimeFinished.play();
    reiniciarCronometro();
    return;
  }
  tempoSegundos -= 1;
  mostrarTempo();
};

botaoStartOnPause.addEventListener("click", inicioOnPause);
botaoReiniciar.addEventListener("click", reiniciarCronometro);

function inicioOnPause() {
  if (intervalo) {
    musicaStop.play();
    zerar();
    return;
  }

  musicaPlayStart.play();
  intervalo = setInterval(tempoContagem, 1000);
  startPauseCont.textContent = "Pause";
  botaoReiniciar.classList.remove("hidden");
}

function zerar() {
  clearInterval(intervalo);
  startPauseCont.textContent = "Começar";
  botaoReiniciar.classList.add("hidden");
  intervalo = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  temporizador.innerHTML = `${tempoFormatado}`;
}

function reiniciarCronometro() {
  const valorInterface = html.getAttribute("data-interface");

  switch (valorInterface) {
    case "foco":
      tempoSegundos = 1500;
      break;
    case "descanso-curto":
      tempoSegundos = 300;
      break;
    case "descanso-longo":
      tempoSegundos = 900;
      break;

    default:
      break;
  }

  mostrarTempo();

  zerar();
}
mostrarTempo();