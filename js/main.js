//declaration of variables const
const formPlayerNames = document.getElementById('formPlayerNames');
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

//Button
const btnHowToPlayClose = document.getElementById('btnHowToPlayClose');
const btnHowToPlayStartGame = document.getElementById('btnHowToPlayStartGame');
const btnHowToPlay = document.getElementById('btnHowToPlay');
const btnNewGame = document.getElementById('newGame');
const btnStartGame = document.getElementById('btnNewGameStart');
const btnCancelGame = document.getElementById('btnNewGameCancel');
const btnExitGame = document.getElementById('exitGame');

//declaration of variables let
let gameActive = true,
    currentPlayer = "X";
let playerXWins = 0;
let playerOWins = 0;
let frameButtons = document.querySelectorAll('.frame');
let firstGameStarted = false;

//Muestra menu de inicio la primera vez que se carga la página
function firsStartPage() {
    const startMenu = document.getElementById('start-menu');
    const btnStartFirsGame = document.getElementById('btnStartFirsGame');

    btnStartFirsGame.addEventListener('click', function () {
        menuNewGameDisplay();
        startMenu.style.display = 'none';
    });

    startMenu.style.display = 'flex';
};

//Muestra menu de como jugar
function menuHowToPlay() {
    const howToPlayMenu = document.getElementById('how-to-play-menu');
    if (howToPlayMenu.style.display == "none" || howToPlayMenu.style.display == '') {
        howToPlayMenu.style.display = "flex"
    } else {
        howToPlayMenu.style.display = "none"
    }
}

//name
function setPlayersName(pX, pO) {
    const playerX = document.getElementById('playerX');
    const playerO = document.getElementById('playerO');
    playerX.innerHTML = pX;
    playerO.innerHTML = pO;
};

//display
function menuNewGameDisplay() {
    if (!firstGameStarted) {
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

//start or canceld new game
function newGame(status) {
    const namePlayerOne = document.getElementById('playerNameOne');
    const namePlayerTwo = document.getElementById('playerNameTwo');
    const errorContainer = document.getElementById('errorNames');

    let playerX = namePlayerOne.value;
    let playerO = namePlayerTwo.value;

    if (status) {
        switch (true) {
            case playerX == '' && playerO == '':
                error('Enter both names')
                break

            case playerX == '':
                error('Enter the name of player X')
                break;

            case playerO == '':
                error('Enter the name of player O')
                break;

            default:
                error('', true)
                startNewGame(playerX, playerO);
        }
    } else {
        menuNewGameDisplay();
        error('', true)
    };
    //show or hide alert of player names
    function error(errorMessage, hide) {
        errorContainer.style.display = 'block'
        errorContainer.innerHTML = errorMessage;
        if (hide) {
            errorContainer.style.display = 'none'
        }
    }
};

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

//random turn
function selectRandomTurn() {
    let numberSelector = Math.floor(Math.random() * 10);
    console.log(numberSelector);
    if (numberSelector <= 5) {
        currentPlayer = 'X';
    } else {
        currentPlayer = 'O';
    }
};

//current player color
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

//cell click
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

function listeners() {
    document.querySelector('.squares').addEventListener('click', handleCellClick);
    document.querySelector('.boton-rest').addEventListener('click', handleRestartGame);
}

function main() {
    listeners()
    setCurrentPlayerColor();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    resetGameState()
    document.querySelectorAll('.frame').forEach(frame => frame.innerHTML = "");
}

function handaleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

//result 
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

//Victories
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

function handleStatusDisplay(message) {
    statusDisplay.innerHTML = message
}

//change player
function handlePlayerChange() {
    currentPlayer = (currentPlayer === 'O') ? 'X' : 'O';
    setCurrentPlayerColor();
}

// Reset Game State
function resetGameState() {
    let i = gameState.length;
    while (i--) {
        gameState[i] = '';
    }
    setCurrentPlayerColor();
    handleStatusDisplay('')
}

//music
// background music
function playMusic() {
    let music = new Howl({
        src: ['music/background.mp3'],
        volume: 0.4,
        loop: true,
    });
    music.play();
}

document.addEventListener('DOMContentLoaded', function () {
    playMusic();
});

//grid sound
let sound = new Howl({
    src: ['music/pencilSound.mp3'],
    volume: 7.9
});

function playSound(event) {
    sound.play();
    const frameId = event.target.id;

    console.log('Botón clicado: ' + frameId);
}

frameButtons.forEach(function (button) {
    button.addEventListener('click', playSound);
});

//Botones
btnNewGame.addEventListener('click', () => { menuNewGameDisplay() });

formPlayerNames.addEventListener('submit', (e) => {
    e.preventDefault();
    newGame(true)
});

btnCancelGame.addEventListener('click', () => { newGame(false) });

btnExitGame.addEventListener('click', () => { window.close(); });

btnHowToPlayClose.addEventListener('click', () => { menuHowToPlay(); });

btnHowToPlayStartGame.addEventListener('click', () => { menuHowToPlay(); });

btnHowToPlay.addEventListener('click', () => { menuHowToPlay(); });

firsStartPage();






