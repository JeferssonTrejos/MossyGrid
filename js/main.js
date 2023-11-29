//Muestra menu de como jugar
function menuHowToPlay (){
    const howToPlayMenu = document.getElementById('how-to-play-menu');
    console.log()
    
    if (howToPlayMenu.style.display == "none" || howToPlayMenu.style.display=='') {
        howToPlayMenu.style.display = "flex"
        console.log('1')
    } else {
        howToPlayMenu.style.display = "none"
        console.log('2')

    }
}

//Muestra menu de inicio la primera ves que se carga la pagina
function firsStartPage() {
    const startMenu = document.getElementById('start-menu');
    const btnStartFirsGame = document.getElementById('btnStartFirsGame');

    btnStartFirsGame.addEventListener('click', function () {
        menuNewGameDisplay();
        startMenu.style.display = 'none';
    });

    startMenu.style.display = 'flex';
};

//Muestra u oculta el menu de nueva partida
function menuNewGameDisplay() {
    if (!firstGameStarted) {//muestra u oculta el boton de cancelar
        btnCancelGame.style.display = 'none'
    } else {
        btnCancelGame.style.display = 'block'

    }

    const namePlayerOne = document.getElementById('playerNameOne');
    const namePlayerTwo = document.getElementById('playerNameTwo');

    namePlayerOne.value = ''
    namePlayerTwo.value = ''

    const menuNewGame = document.getElementById('start-new-game');

    if (menuNewGame.style.display === "flex") {
        menuNewGame.style.display = "none"
    } else {
        menuNewGame.style.display = "flex"
    };
};

//Inicia o cancela una nueva partida
function newGame(status) {
    const namePlayerOne = document.getElementById('playerNameOne');
    const namePlayerTwo = document.getElementById('playerNameTwo');
    let playerX = namePlayerOne.value
    let playerO = namePlayerTwo.value
    //status = 0 -- cancel  
    //status = 1 -- start

    if (status) {//El juego inicia / comprobaciones
        switch (true) {
            case playerX == '' && playerO == '':
                alert('Los nombres no deben estar vacios');
                break

                case playerX == '':
                    alert('Nombre de jugador X no puede estar vacio');
                break;
                
            case playerO == '':
                alert('Nombre de jugador O no puede estar vacio')
                break;

            default://inicia la partida
                startNewGame(playerX, playerO)
        }
    } else {//Nueva partida cancelada
        console.log('Nueva partida cancelada')
        menuNewGameDisplay();
    }
};

//Inicia nueva partida
function startNewGame(playerX, playerO) {
    setPlayersName(playerX, playerO);
    handleRestartGame();
    playerXWins = 0;
    playerOWins = 0;
    
    document.querySelector('.playerXScore').innerText = `${playerXWins}`;
    document.querySelector('.playerOScore').innerText = `${playerOWins}`;

    selectRandomTurn();
    handleStatusDisplay('')
    main();
    menuNewGameDisplay();
    firstGameStarted = true
}
//asigna nombres
function setPlayersName(pX, pO) {
    const playerX = document.getElementById('playerX');
    const playerO = document.getElementById('playerO');
    playerX.innerHTML = pX;
    playerO.innerHTML = pO;
};
//alterna color del jugador de turno
function setCurrentPlayerColor() {
    const containerPlayerX = document.getElementById('containerPlayerX');
    const containerPlayerO = document.getElementById('containerPlayerO');

    let greenDark = '#628e45';
    let transparent = '#00000000';

    if (currentPlayer == 'X') {
        containerPlayerX.style.backgroundColor = greenDark;
        containerPlayerO.style.backgroundColor = transparent;
    } else {
        containerPlayerX.style.backgroundColor = transparent;
        containerPlayerO.style.backgroundColor = greenDark;
    }
};
//asigna el jugador que iniciara
function selectRandomTurn() {
    let numberSelector = Math.floor(Math.random() * 10);
    console.log(numberSelector);
    if (numberSelector <= 5) {
        currentPlayer = 'X';
    } else {
        currentPlayer = 'O';
    }
};

//constant declaration
const statusDisplay = document.querySelector('.notificacionTurno');
const gameState = ["", "", "", "", "", "", "", "", ""];
const victories = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

// victoriesMessage = () => `El jugador ${currentPlayer} ha ganado`;
victoriesMessage = () => {
    let namePlayerX = document.getElementById('playerX').textContent;
    let namePlayerO = document.getElementById('playerO').textContent;

    if (currentPlayer == 'X') {
        return `${namePlayerX} (${currentPlayer}) has won`
    } else {
        return `${namePlayerO} (${currentPlayer}) has won`
    }
};
tieMessage = () => `The game has ended in a tie`;
// shiftPlayer = () => `Turno del jugador ${currentPlayer}`;

//declaration of variables
let gameActive = true,
    currentPlayer = "X";

let playerXWins = 0;
let playerOWins = 0;
//Funtions
function main() {
    // handleStatusDisplay(shiftPlayer())
    listeners()
    setCurrentPlayerColor();
}


function listeners() {
    document.querySelector('.squares').addEventListener('click', handleCellClick);
    document.querySelector('.boton-rest').addEventListener('click', handleRestartGame);
}

function handleStatusDisplay(message) {
    statusDisplay.innerHTML = message
}

function handleCellClick(clickedEvent) {
    const clickedCell = clickedEvent.target;
    if (clickedCell.classList.contains('frame')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return
        }

        handaleCellPlayed(clickedCell, clickedCellIndex)
        hadleResultValidation();

    }
    console.log(clickedCell);
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    resetGameState()
    // handleStatusDisplay(shiftPlayer())
    document.querySelectorAll('.frame').forEach(frame => frame.innerHTML = "");

}

function handaleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

function hadleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < victories.length; i++) {
        const victCondition = victories[i];
        let position1 = gameState[victCondition[0]];
        let position2 = gameState[victCondition[1]];
        let position3 = gameState[victCondition[2]];
        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }

        if (position1 === position2 && position2 === position3) {
            roundWon = true;
            break
        }

    }
    if (roundWon) {
        if (currentPlayer === 'X') {
            playerXWins++;
        } else {
            playerOWins++;
        }
        updateScoreboard();
        handleStatusDisplay(victoriesMessage());
        gameActive = false;
        return;
    }
    function updateScoreboard() {
        document.querySelector('.playerXScore').innerText = ` ${playerXWins}`;
        document.querySelector('.playerOScore').innerText = `${playerOWins} `;
    }
    if (roundWon) {
        handleStatusDisplay(victoriesMessage());
        gameActive = false;
        return
    }
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        handleStatusDisplay(tieMessage())
        gameActive = false;
        return
    }
    handlePlayerChange();
}
function handlePlayerChange() {
    currentPlayer = (currentPlayer === 'O') ? 'X' : 'O';
    // handleStatusDisplay(shiftPlayer());

    setCurrentPlayerColor();
}


function resetGameState() {
    let i = gameState.length;
    while (i--) {
        gameState[i] = '';
    }
    setCurrentPlayerColor();
    handleStatusDisplay('')
}

function name(params) {
    
}
// main();

//Botones menu de nueva partida
const btnHowToPlayClose = document.getElementById('btnHowToPlayClose');
const btnHowToPlayStartGame = document.getElementById('btnHowToPlayStartGame');
const btnHowToPlay = document.getElementById('btnHowToPlay');
const btnNewGame = document.getElementById('newGame');
const btnStartGame = document.getElementById('btnNewGameStart');
const btnCancelGame = document.getElementById('btnNewGameCancel');
const btnExitGame = document.getElementById('exitGame');

btnNewGame.addEventListener('click', () => { menuNewGameDisplay() });

btnStartGame.addEventListener('click', () => { newGame(true) });

btnCancelGame.addEventListener('click', () => { newGame(false) });

btnExitGame.addEventListener('click', () => { window.close();});

btnHowToPlayClose.addEventListener('click',()=>{ menuHowToPlay(); });
btnHowToPlayStartGame.addEventListener('click',()=>{ menuHowToPlay(); });
btnHowToPlay.addEventListener('click',()=>{ menuHowToPlay(); });

let firstGameStarted = false;

firsStartPage();






