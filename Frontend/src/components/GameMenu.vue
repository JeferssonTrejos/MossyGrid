<template>
  <Transition name="modal">
    <div v-if="view !== 'playing'" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      
      <div class="w-full max-w-sm rounded-3xl p-8 shadow-2xl transition-all
                  bg-mossy-light text-slate-800 
                  dark:bg-mossy-dark dark:text-slate-100 dark:border dark:border-white/10">
        
        <div v-if="view === 'setup'">
          <header class="mb-8 text-center">
            <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg shadow-mossy-green/20">
                <img src="../../public/img/logoMossyGrid.png" alt="Logo">
            </div>
            <h4 class="text-2xl font-black tracking-tight uppercase">New Game</h4>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Configure your game</p>
          </header>
          
          <div class="mb-8 flex gap-1 rounded-2xl bg-slate-200/50 p-1 dark:bg-white/5">
            <button @click="isVsBot = false; errorMessage = ''" 
                    :class="!isVsBot ? 'bg-mossy-green text-white shadow-md' : 'text-slate-500 hover:bg-slate-300/30 dark:hover:bg-white/10'"
                    class="flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-200">
              PvP
            </button>
            <button @click="isVsBot = true; errorMessage = ''" 
                    :class="isVsBot ? 'bg-mossy-green text-white shadow-md' : 'text-slate-500 hover:bg-slate-300/30 dark:hover:bg-white/10'"
                    class="flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-200">
              Vs Bot
            </button>
          </div>

          <div class="space-y-5">
            <div class="space-y-1.5">
              <label class="ml-1 text-[10px] font-black uppercase tracking-widest text-mossy-green">player X</label>
              <input v-model="playerX" type="text" placeholder="Tu nombre"
                     @input="errorMessage = ''"
                     class="w-full rounded-2xl border-2 border-transparent bg-slate-100 p-4 text-sm font-bold outline-none transition-all focus:border-mossy-green focus:bg-white dark:bg-white/10 dark:focus:bg-slate-800">
            </div>
            
            <Transition name="slide">
              <div v-if="!isVsBot" class="space-y-1.5">
                <label class="ml-1 text-[10px] font-black uppercase tracking-widest text-mossy-earth">player O</label>
                <input v-model="playerO" type="text" placeholder="Nombre oponente"
                       @input="errorMessage = ''"
                       class="w-full rounded-2xl border-2 border-transparent bg-slate-100 p-4 text-sm font-bold outline-none transition-all focus:border-mossy-earth focus:bg-white dark:bg-white/10 dark:focus:bg-slate-800">
              </div>
            </Transition>

            <Transition name="slide">
              <div v-if="errorMessage" 
                   class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-3 rounded-xl text-center">
                <p class="text-[10px] font-black uppercase tracking-tighter text-red-500">{{ errorMessage }}</p>
              </div>
            </Transition>

            <div class="flex flex-col gap-4 pt-4">
              <button @click="startGame" :disabled="!playerX || (!isVsBot && !playerO)"
                      class="group relative overflow-hidden rounded-2xl bg-mossy-green py-4 font-black text-white shadow-xl shadow-mossy-green/30 transition-all active:scale-95 disabled:opacity-50">
                <span class="relative z-10 uppercase tracking-widest">Start Match!</span>
                <div class="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0"></div>
              </button>
              <button @click="$emit('close-menu')" class="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-mossy-green">Close menu</button>
            </div>
          </div>
        </div>

        <div v-if="view === 'how-to-play'" class="animate-in fade-in zoom-in duration-300">
          <header class="mb-6 text-center">
            <h2 class="text-2xl font-black uppercase tracking-tight dark:text-white">How to play</h2>
          </header>

          <div class="space-y-3 text-[11px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            <ol class="list-decimal list-inside space-y-2">
              <li>Click on the <span class="font-bold text-mossy-green">"Start game"</span> button.</li>
              <li>Enter the name of both players.</li>
              <li>Click on <span class="font-bold text-mossy-green">START GAME</span>.</li>
              <li>You will see the dashboard on your screen.</li>
              <li>To make your move, click on the box you want to place the tile on (usually "X" or "O").</li>
              <li>The game alternates until someone makes a straight line (horizontally, vertically or diagonally).</li>
              <li>If you win, it will be marked as a point.</li>
              <li>If you win, <span class="italic text-mossy-green">congratulations!</span></li>
            </ol>
          </div>

          <div class="mt-8 flex justify-center">
            <button @click="$emit('close-menu')" 
                    class="w-full rounded-2xl bg-mossy-green py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-mossy-green/30 transition-all hover:brightness-110 active:scale-95">
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['view']);
const emit = defineEmits(['start-game', 'close-menu']);

const isVsBot = ref(true);
const playerX = ref('');
const playerO = ref('');
const errorMessage = ref('');

const startGame = () => {
  errorMessage.value = '';
  const nameX = playerX.value.trim();
  const nameO = playerO.value.trim();

  if (!isVsBot.value && nameX.toLowerCase() === nameO.toLowerCase()) {
    errorMessage.value = "Los jugadores deben tener nombres distintos";
    return;
  }
  if (nameX.length > 12 || (!isVsBot.value && nameO.length > 12)) {
    errorMessage.value = "Los nombres no pueden exceder los 12 caracteres";
    return;
  }
  const nameRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;
  if (!nameRegex.test(nameX) || (!isVsBot.value && !nameRegex.test(nameO))) {
    errorMessage.value = "Usa solo letras y números en los nombres";
    return;
  }

  emit('start-game', {
    X: nameX,
    O: isVsBot.value ? 'Mossy Bot' : nameO,
    vsBot: isVsBot.value
  });
};
</script>

<style scoped>
/* Las animaciones que ya tenías */
.modal-enter-active, .modal-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>