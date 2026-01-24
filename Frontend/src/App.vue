<script setup>
import { ref } from 'vue';
import { useGame } from './composables/useGame';
import { useTheme } from './composables/useTheme';
import GameMenu from './components/GameMenu.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';

const { isDarkMode, toggleTheme } = useTheme();
const { 
  board, turn, scores, players, gameActive, 
  isThinking, isVsBotGame, ejecutarJugada, reiniciarTablero 
} = useGame();

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
                body: JSON.stringify({ 
                    board: board.value, 
                    botSymbol: 'O', 
                    playerSymbol: 'X' 
                })
            });

            // VALIDACIÓN CRÍTICA: Si no es JSON o no es OK, no intentamos parsear
            if (!res.ok) throw new Error("Servidor del bot fuera de línea");
            
            const data = await res.json();
            if (data && data.move !== undefined) {
                ejecutarJugada(data.move, checkWinner);
            }
        } catch (e) {
            console.error("Error con el bot:", e.message);
            // Si el bot falla, podrías avisar al usuario o permitir que otro jugador mueva
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
  <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 bg-slate-100 dark:bg-slate-950">
    
    <button @click="toggleTheme" 
            class="fixed top-6 right-6 z-40 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-white/10 transition-transform active:scale-90">
        {{ isDarkMode ? '☀️' : '🌙' }}
    </button>

    <GameMenu
      :view="currentView"
      @start-game="iniciarPartida"
      @close-menu="currentView = 'playing'"
    />

    <main v-if="currentView === 'playing'" 
          class="flex w-full max-w-4xl flex-col gap-6 md:flex-row md:items-stretch animate-in fade-in zoom-in duration-500">
        
        <section class="flex flex-[2] flex-col items-center gap-8 rounded-[2.5rem] p-8 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-white/5">
            <ScoreBoard :players="players" :scores="scores" :current-turn="turn" />
            <GameBoard :board="board" :is-thinking="isThinking" @make-move="handleMove" />
            <button class="w-full max-w-xs rounded-2xl bg-[#74a257] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-[#74a257]/20 transition-all hover:brightness-110 active:scale-95"
                    @click="reiniciarTablero">
                Reiniciar Tablero
            </button>
        </section>

        <aside class="flex flex-1 flex-col justify-between gap-6 rounded-[2.5rem] p-8 shadow-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/5">
            <div class="flex flex-col items-center text-center">
                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#74a257] shadow-xl">
                    <span class="text-2xl font-black text-white">MG</span>
                </div>
                <h1 class="text-xl font-black uppercase tracking-tighter dark:text-white">Mossy Grid</h1>
                <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Software Engineering Edition</p>
            </div>

            <nav class="flex flex-col gap-3">
                <button @click="currentView = 'setup'" 
                        class="w-full rounded-xl bg-slate-200/50 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
                    Nuevo Juego
                </button>
                <button @click="currentView = 'how-to-play'" 
                        class="w-full rounded-xl bg-slate-200/50 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
                    ¿Cómo jugar?
                </button>
            </nav>
        </aside>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}
</style>