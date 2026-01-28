import { ref } from 'vue';

export function useGame() {
  const board = ref(Array(9).fill(null));
  const turn = ref('X');
  const scores = ref({ X: 0, O: 0 });
  const players = ref({ X: 'Jugador X', O: 'Jugador O' });
  const gameActive = ref(true);
  const isThinking = ref(false);
  const isVsBotGame = ref(false);
  const currentView = ref('setup'); 

  const VICTORIES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = () => {
    return VICTORIES.some(([a, b, c]) =>
      board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]
    );
  };

  const ejecutarJugada = (index) => {
    if (board.value[index] || !gameActive.value) return 'invalid';
    
    board.value[index] = turn.value;

    if (checkWinner()) {
      scores.value[turn.value]++;
      gameActive.value = false;
      return 'win';
    }

    if (!board.value.includes(null)) {
      gameActive.value = false;
      return 'draw';
    }

    turn.value = turn.value === 'X' ? 'O' : 'X';
    return 'continue';
  };

  const llamarAlBot = async () => {
    if (!isVsBotGame.value || turn.value !== 'O' || !gameActive.value) return;

    isThinking.value = true;
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/bot-move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: board.value,
          botSymbol: 'O',
          playerSymbol: 'X'
        })
      });

      if (!res.ok) throw new Error("Bot no disponible");
      
      const data = await res.json();
      if (data && data.move !== undefined) {
        ejecutarJugada(data.move);
      }
    } catch (e) {
      console.error("Error en comunicación con Bot:", e.message);
    } finally {
      isThinking.value = false;
    }
  };

  const iniciarPartida = (config) => {
    players.value = { X: config.X, O: config.O };
    isVsBotGame.value = config.vsBot;
    reiniciarTablero();
    currentView.value = 'playing';
  };

  const reiniciarTablero = () => {
    board.value = Array(9).fill(null);
    turn.value = 'X';
    gameActive.value = true;
  };

  return {
    board, turn, scores, players, gameActive, isThinking, 
    currentView, iniciarPartida, ejecutarJugada, llamarAlBot, reiniciarTablero
  };
}