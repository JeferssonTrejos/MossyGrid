<template>
  <Transition name="modal">
    <div class="game-menu-overlay" v-if="view !== 'playing'">
      <div class="modal-card">
        <header class="modal-header">
          <img class="logo-mini" src="/img/logoMossyGrid.png" alt="Logo">
          <h4>Configuración</h4>
        </header>
        
        <div v-if="view === 'setup'" class="setup-content">
          <div class="mode-selector">
            <button 
              :class="{ active: !isVsBot }" 
              @click="isVsBot = false"
            >
              <span class="icon">👥</span> PvP
            </button>
            <button 
              :class="{ active: isVsBot }" 
              @click="isVsBot = true"
            >
              <span class="icon">🤖</span> Vs Bot
            </button>
          </div>

          <div class="form-container">
            <div class="input-group">
              <label>Jugador X</label>
              <input v-model="playerX" type="text" placeholder="Escribe tu nombre">
            </div>
            
            <Transition name="slide">
              <div class="input-group" v-if="!isVsBot">
                <label>Jugador O</label>
                <input v-model="playerO" type="text" placeholder="Nombre oponente">
              </div>
            </Transition>
            
            <div class="action-buttons">
              <button 
                @click="startGame" 
                :disabled="!playerX || (!isVsBot && !playerO)"
                class="btn-primary"
              >
                ¡COMENZAR!
              </button>
              <button @click="$emit('close-menu')" class="btn-text">Cancelar</button>
            </div>
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

const startGame = () => {
  emit('start-game', {
    X: playerX.value,
    O: isVsBot.value ? 'Mossy Bot' : playerO.value,
    vsBot: isVsBot.value
  });
};
</script>

<style scoped>
/* Overlay que cubre todo el juego */
.game-menu-overlay {
  position: fixed;
  inset: 0; /* Cubre todo */
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

/* Tarjeta del Modal */
.modal-card {
  background-color: var(--container-bg);
  width: 100%;
  max-width: 400px;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  text-align: center;
  margin-bottom: 25px;
}

.logo-mini {
  width: 60px;
  margin-bottom: 10px;
}

.modal-card h4 {
  color: var(--text-dark);
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Selector de Modo */
.mode-selector {
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 15px;
  margin-bottom: 25px;
}

.mode-selector button {
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  color: var(--text-dark);
  cursor: pointer;
  border-radius: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.mode-selector button.active {
  background-color: var(--bg-mossy);
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Inputs */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--bg-mossy);
  margin-left: 5px;
}

.input-group input {
  padding: 14px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  background-color: white;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: var(--bg-mossy);
}

/* Botones */
.action-buttons {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-primary {
  padding: 16px;
  background-color: var(--bg-mossy);
  color: white;
  border: none;
  border-radius: 15px 25px; /* Estilo Mossy original */
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-text {
  background: transparent;
  border: none;
  color: var(--bg-earth);
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
}

/* Animaciones */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>