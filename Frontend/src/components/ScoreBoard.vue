<template>
  <div class="flex w-full justify-center p-2">
    <div class="flex w-full max-w-md items-center justify-between rounded-3xl border border-white/20 bg-white/40 p-5 shadow-xl backdrop-blur-md transition-all duration-500 dark:border-white/5 dark:bg-slate-900/60">
      
      <div class="flex flex-col items-center gap-1 transition-all duration-500"
           :class="currentTurn === 'X' ? 'scale-110 opacity-100' : 'scale-90 opacity-40'">
        <span class="text-3xl font-black text-x-mossy">X</span>
        <div class="text-center">
          <h2 class="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {{ players.X }}
          </h2>
          <p v-if="currentTurn === 'X'" class="mt-1 text-[8px] font-black uppercase tracking-tighter text-mossy-green animate-pulse">
            your turn
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4 px-4 text-3xl font-black tracking-tighter text-slate-800 dark:text-white">
        <span class="tabular-nums">{{ scores.X }}</span>
        <span class="text-slate-300 dark:text-slate-700">/</span>
        <span class="tabular-nums">{{ scores.O }}</span>
      </div>

      <div class="flex flex-col items-center gap-1 transition-all duration-500"
           :class="currentTurn === 'O' ? 'scale-110 opacity-100' : 'scale-90 opacity-40'">
        <span class="text-3xl font-black text-o-earth">O</span>
        <div class="text-center">
          <h2 class="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {{ players.O }}
          </h2>
          <p v-if="currentTurn === 'O'" class="mt-1 text-[8px] font-black uppercase tracking-tighter text-mossy-earth animate-pulse">
            your turn
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  players: { type: Object, required: true },
  scores: { type: Object, required: true },
  currentTurn: { type: String, required: true }
});
</script>

<style scoped>
.text-x-mossy {
  color: #74a257;
  filter: drop-shadow(0 0 10px rgba(116, 162, 87, 0.3));
}

.text-o-earth {
  color: #AD9F6D;
  filter: drop-shadow(0 0 10px rgba(173, 159, 109, 0.3));
}
</style>