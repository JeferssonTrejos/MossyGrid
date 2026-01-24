<template>
  <div class="scoreboard">
    <div class="player-card" :class="{ 'active-turn': currentTurn === 'X' }">
      <div class="player-symbol x-symbol">X</div>
      <div class="player-info">
        <h2 class="player-name">{{ players.X }}</h2>
        <p v-if="currentTurn === 'X'" class="turn-indicator">YOUR TURN</p>
      </div>
    </div>

    <div class="score-display">
      <span class="score">{{ scores.X }}</span>
      <span class="divider">-</span>
      <span class="score">{{ scores.O }}</span>
    </div>

    <div class="player-card" :class="{ 'active-turn': currentTurn === 'O' }">
      <div class="player-info">
        <h2 class="player-name">{{ players.O }}</h2>
        <p v-if="currentTurn === 'O'" class="turn-indicator">YOUR TURN</p>
      </div>
      <div class="player-symbol o-symbol">O</div>
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
.scoreboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #3a3a3a;
  padding: 15px 25px;
  border-radius: 15px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
}

.player-card {
  display: flex;
  align-items: center;
  gap: 15px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.player-card.active-turn {
  opacity: 1;
  transform: scale(1.05);
}



.x-symbol { color: var(--accent-green); text-shadow: 0 0 10px var(--accent-green); }
.o-symbol { color: var(--text-primary); text-shadow: 0 0 10px var(--text-primary); }

.player-info {
  display: flex;
  flex-direction: column;
}

/* Dentro de la sección <style> de ScoreBoard.vue */
.player-symbol {
  /* Antes era 3rem, bajémoslo a la mitad para que sea un ícono y no el protagonista */
  font-size: 1.5rem; 
  font-weight: bold;
  line-height: 1;
}

.player-name {
  font-size: 0.9rem; /* Nombre más pequeño y elegante */
  font-weight: 600;
}

.turn-indicator {
  margin: 5px 0 0 0;
  font-size: 0.8rem;
  color: var(--accent-green);
  font-weight: bold;
  letter-spacing: 1px;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--text-primary);
}

.divider { color: var(--text-secondary); }

@media (max-width: 600px) {
    .scoreboard {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    .player-card {
        flex-direction: column;
        gap: 5px;
    }
    .score-display {
        order: 2; /* Pone el marcador en medio en móvil */
        font-size: 2rem;
    }
}
</style>