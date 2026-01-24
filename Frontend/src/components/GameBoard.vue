<template>
  <div class="board-container">
    <div class="squares">
      <button
        v-for="(cell, index) in board"
        :key="index"
        class="frame"
        :class="{ 'is-x': cell === 'X', 'is-o': cell === 'O', 'is-thinking': isThinking && !cell }"
        @click="$emit('make-move', index)"
        :disabled="cell !== null || isThinking"
      >
        <Transition name="pop">
          <span v-if="cell">{{ cell }}</span>
        </Transition>
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
.board-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
}

.squares {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 400px; /* Tamaño máximo del tablero */
  aspect-ratio: 1 / 1; /* Mantiene el tablero cuadrado */
}

.frame {
  background: transparent;
  border-right: 3px solid var(--border-grid);
  border-bottom: 3px solid var(--border-grid);
  
  /* REDUCCIÓN AQUÍ: Antes era 3rem o 4.5rem, ahora lo hacemos más elegante */
  font-size: clamp(1.8rem, 8vw, 2.5rem); 
  
  font-weight: bold;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  
  /* Añadimos un pequeño padding interno para que la letra no toque los bordes */
  padding: 5px; 
}

.frame:hover:not(:disabled) {
  background-color: #454545;
  transform: translateY(-2px);
}

.frame:disabled {
  cursor: default;
}

/* Estilos de los símbolos con Glow */
.is-x {
  color: var(--accent-green);
  text-shadow: 0 0 15px var(--accent-green);
}

.is-o {
  color: var(--accent-orange);
  text-shadow: 0 0 15px var(--accent-orange);
}

/* Animación del Bot Pensando */
.is-thinking {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { background-color: #3a3a3a; }
  50% { background-color: #4a4a4a; }
  100% { background-color: #3a3a3a; }
}

/* Animación de entrada de símbolo */
.pop-enter-active {
  animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop-in {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>