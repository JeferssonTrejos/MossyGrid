import { ref } from 'vue';

export function useGame() {
    const board = ref(Array(9).fill(null));
    const turn = ref('X');
    const scores = ref({ X: 0, O: 0 });
    const players = ref({ X: 'Jugador X', O: 'Jugador O' });
    const gameActive = ref(true);
    const isThinking = ref(false);
    const isVsBotGame = ref(false);

    const ejecutarJugada = (index, checkWinnerCallback) => {
        if (board.value[index] || !gameActive.value) return;
        board.value[index] = turn.value;
        
        const win = checkWinnerCallback();
        if (win) {
            scores.value[turn.value]++;
            gameActive.value = false;
        } else if (!board.value.includes(null)) {
            gameActive.value = false;
        } else {
            turn.value = turn.value === 'X' ? 'O' : 'X';
        }
    };

    const reiniciarTablero = () => {
        board.value = Array(9).fill(null);
        turn.value = 'X';
        gameActive.value = true;
    };

    return { board, turn, scores, players, gameActive, isThinking, isVsBotGame, ejecutarJugada, reiniciarTablero };
}