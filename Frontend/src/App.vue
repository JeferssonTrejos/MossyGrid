<script setup>
import { useGame } from './composables/useGame';
import { useTheme } from './composables/useTheme';
import GameMenu from './components/GameMenu.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';

const { isDarkMode, toggleTheme } = useTheme();
const { 
  board, turn, scores, players, isThinking, currentView, 
  iniciarPartida, ejecutarJugada, llamarAlBot, reiniciarTablero 
} = useGame();


const handleMove = async (index) => {
  const status = ejecutarJugada(index);
  if (status === 'continue') {
    await llamarAlBot();
  }
};
</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 bg-slate-100 dark:bg-slate-950">
    
    <button @click="toggleTheme" 
            class="fixed top-6 right-6 z-40 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-white/10 transition-transform active:scale-90">
        {{ isDarkMode ? '☀️' : '🌙' }}
    </button>

    <GameMenu :view="currentView" @start-game="iniciarPartida" @close-menu="currentView = 'playing'" />

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
                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-xl hadow-xl">
                    <img src="../public/img/logoMossyGrid.png" alt="">
                </div>
                <h1 class="text-xl font-black uppercase tracking-tighter dark:text-white">Mossy Grid</h1>
                <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400 text-center">San Miguel, SV</p>
            </div>

            <nav class="flex flex-col gap-3">
                <button @click="currentView = 'setup'" class="w-full rounded-xl bg-slate-200/50 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
                    Nuevo Juego
                </button>
                <button @click="currentView = 'how-to-play'" class="menu-btn">¿Cómo jugar?</button>
            </nav>
        </aside>
    </main>
  </div>
</template>

