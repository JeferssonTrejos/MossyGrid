<script setup>
import { ref } from 'vue';
import { useGame } from './composables/useGame';
import { useTheme } from './composables/useTheme';
import GameMenu from './components/GameMenu.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';

const { isDarkMode, toggleTheme } = useTheme();
const { board, turn, scores, players, gameActive, isThinking, isVsBotGame, ejecutarJugada, reiniciarTablero } = useGame();

const currentView = ref('setup');

const VICTORIES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const checkWinner = () => {
  return VICTORIES.some(([a, b, c]) =>
    board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]
  );
};

const handleMove = async (index) => {
    ejecutarJugada(index, checkWinner);

    if (isVsBotGame.value && turn.value === 'O' && gameActive.value) {
        isThinking.value = true;
        try {
            const res = await fetch('http://localhost:3000/api/bot-move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board: board.value, botSymbol: 'O', playerSymbol: 'X' })
            });
            const { move } = await res.json();
            if (move !== undefined) ejecutarJugada(move, checkWinner);
        } finally {
            isThinking.value = false;
        }
    }
};

const iniciarPartida = (config) => {
    players.value = { X: config.X, O: config.O };
    isVsBotGame.value = config.vsBot;
    reiniciarTablero();
    currentView.value = 'playing';
};
</script>

<template>
  <div class="app-container">
    <button @click="toggleTheme" class="theme-toggle">
        {{ isDarkMode ? '☀️' : '🌙' }}
    </button>

    <GameMenu
      :view="currentView"
      @start-game="iniciarPartida"
      @close-menu="currentView = 'playing'"
    />

    <main v-if="currentView === 'playing'" class="game-content">
        <div class="game-panel">
            <ScoreBoard
                :players="players"
                :scores="scores"
                :current-turn="turn"
            />

            <GameBoard
                :board="board"
                :is-thinking="isThinking"
                @make-move="handleMove"
            />

            <div class="controls">
                <button class="btn-reset" @click="reiniciarTablero">Reset Match</button>
            </div>
        </div>

        <div class="side-panel">
            <div class="logo-container">
                <div class="css-logo">MG</div>
            </div>
            <div class="menu-buttons">
                <button @click="currentView = 'setup'" class="btn-menu">New Game</button>
                <button @click="currentView = 'how-to-play'" class="btn-menu">How to play?</button>
            </div>
        </div>
    </main>
  </div>
</template>

<style>
/* Variables Globales de Color */
:root {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2c2c2c;
  --accent-green: #4ade80;
  --accent-orange: #fb923c;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

[data-theme='dark'] {
  /* Ya es el tema por defecto, puedes ajustar si quieres un tema claro */
}

body {
    margin: 0;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-family);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.app-container {
    width: 100%;
    max-width: 900px;
    padding: 20px;
    box-sizing: border-box;
}

.game-content {
    display: flex;
    gap: 30px;
    background-color: var(--bg-secondary);
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.game-panel {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
}

.side-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: 2px solid #3a3a3a;
    padding-left: 30px;
}

.controls {
    width: 100%;
    display: flex;
    justify-content: center;
}

/* Botones */
.btn-reset, .btn-menu {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-family);
}

.btn-reset {
    background-color: var(--accent-green);
    color: var(--bg-primary);
    font-size: 1rem;
}

.btn-reset:hover { background-color: #22c55e; }

.btn-menu {
    background-color: #3a3a3a;
    color: var(--text-primary);
    width: 100%;
    margin-bottom: 10px;
}

.btn-menu:hover { background-color: #4a4a4a; }

.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-secondary);
    border: none;
    color: var(--text-primary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

/* Logo Placeholder */
.css-logo {
    font-size: 3rem;
    font-weight: 900;
    color: var(--accent-green);
    text-shadow: 2px 2px var(--accent-orange);
}

/* Responsividad */
@media (max-width: 768px) {
    .game-content {
        flex-direction: column;
        padding: 20px;
    }
    .side-panel {
        border-left: none;
        border-top: 2px solid #3a3a3a;
        padding-left: 0;
        padding-top: 20px;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
    .menu-buttons {
        display: flex;
        gap: 10px;
    }
    .btn-menu {
        margin-bottom: 0;
        width: auto;
    }
}
</style>