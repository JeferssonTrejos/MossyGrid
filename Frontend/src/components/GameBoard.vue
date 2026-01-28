<template>
  <div class="flex w-full justify-center p-4">
    <div class="grid aspect-square w-full max-w-[300px] grid-cols-3 overflow-hidden rounded-[2rem] border border-white/20 bg-white/40 shadow-2xl backdrop-blur-md dark:bg-slate-900/60 dark:border-white/5">
      
      <button 
        v-for="(cell, index) in board" 
        :key="index"
        @click="$emit('make-move', index)"
        :disabled="cell !== null || isThinking"
        class="group relative flex items-center justify-center transition-all duration-300
               /* Lógica de bordes optimizada con v4 */
               not-nth-[3n]:border-r-2 
               not-nth-[n+7]:border-b-2
               border-slate-200/50 dark:border-white/10"
      >
        <div v-if="!cell && !isThinking" 
             class="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/20 dark:group-hover:bg-white/5">
        </div>

        <Transition name="pop">
          <span v-if="cell" 
                class="text-4xl font-black md:text-5xl"
                :class="cell === 'X' ? 'text-x-mossy' : 'text-o-earth'">
            {{ cell }}
          </span>
        </Transition>

        <div v-if="isThinking && !cell" 
             class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400">
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  board: { type: Array, required: true },
  isThinking: { type: Boolean, default: false }
});

defineEmits(['make-move']);
</script>

<style scoped>
.text-x-mossy {
  color: #74a257;
  filter: drop-shadow(0 0 8px rgba(116, 162, 87, 0.4));
}

.text-o-earth {
  color: #AD9F6D;
  filter: drop-shadow(0 0 8px rgba(173, 159, 109, 0.4));
}


.pop-enter-active {
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop-in {
  0% { transform: scale(0.3); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>