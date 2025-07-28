const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const resetScoreButton = document.getElementById('reset-score');
const statusDisplay = document.getElementById('status-display');
const currentPlayerSpan = document.getElementById('current-player');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const gameMessage = document.getElementById('game-message');
const messageText = document.getElementById('message-text');
const messageEmoji = document.getElementById('message-emoji');

const difficultySelect = document.getElementById('difficulty');
const playerXNameInput = document.getElementById('player-x-name');
const playerONameInput = document.getElementById('player-o-name');
const themeSelect = document.getElementById('theme');
const soundEffectsCheckbox = document.getElementById('sound-effects');
const animationsCheckbox = document.getElementById('animations');

const historyList = document.getElementById('history-list');
const clearHistoryButton = document.getElementById('clear-history');

let gameState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    isGameActive: true,
    gameMode: 'twoPlayer',
    aiDifficulty: 'medium',
    isAITurn: false,
    scores: { X: 0, O: 0 },
    playerNames: { X: 'Jugador X', O: 'Jugador O' },
    gamesPlayed: 0,
    settings: {
        soundEffects: true,
        animations: true,
        theme: 'classic'
    }
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]  
];

const aiConfig = {
    easy: { randomChance: 0.7, depth: 1 },
    medium: { randomChance: 0.3, depth: 3 },
    hard: { randomChance: 0.0, depth: 6 }
};

class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.createSounds();
    }

    createSounds() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.soundFrequencies = {
            click: 800,
            win: [523, 659, 784],
            lose: [440, 369, 311],
            tie: [440],
            reset: 600,
            hover: 1000
        };
    }

    playTone(frequency, duration = 100, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    playChord(frequencies, duration = 300) {
        frequencies.forEach((freq, index) => {
            setTimeout(() => this.playTone(freq, duration), index * 50);
        });
    }

    play(soundName) {
        if (!this.enabled) return;

        const frequencies = this.soundFrequencies[soundName];
        if (Array.isArray(frequencies)) {
            this.playChord(frequencies);
        } else if (frequencies) {
            this.playTone(frequencies);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }
}

const soundManager = new SoundManager();

class StorageManager {
    constructor() {
        this.storageKey = 'ticTacToeGame';
    }

    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.warn('No se pudo guardar en localStorage:', error);
        }
    }

    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn('No se pudo cargar desde localStorage:', error);
            return null;
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('No se pudo limpiar localStorage:', error);
        }
    }

    saveGameHistory(gameResult) {
        const history = this.getGameHistory();
        const gameEntry = {
            id: Date.now(),
            date: new Date().toLocaleString('es-ES'),
            result: gameResult.result,
            winner: gameResult.winner,
            playerNames: { ...gameState.playerNames },
            gameMode: gameState.gameMode,
            movesCount: gameResult.movesCount
        };
        
        history.unshift(gameEntry);

        if (history.length > 50) {
            history.splice(50);
        }
        
        try {
            localStorage.setItem(this.storageKey + '_history', JSON.stringify(history));
        } catch (error) {
            console.warn('No se pudo guardar el historial:', error);
        }
    }

    getGameHistory() {
        try {
            const history = localStorage.getItem(this.storageKey + '_history');
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.warn('No se pudo cargar el historial:', error);
            return [];
        }
    }

    clearGameHistory() {
        try {
            localStorage.removeItem(this.storageKey + '_history');
        } catch (error) {
            console.warn('No se pudo limpiar el historial:', error);
        }
    }
}

const storageManager = new StorageManager();

class AIPlayer {
    constructor() {
        this.isThinking = false;
    }

    minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
        const winner = this.checkWinner(board);

        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (winner === 'tie') return 0;
        if (depth === 0) return this.evaluateBoard(board);

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const evaluation = this.minimax(board, depth - 1, false, alpha, beta);
                    board[i] = '';
                    maxEval = Math.max(maxEval, evaluation);
                    alpha = Math.max(alpha, evaluation);
                    if (beta <= alpha) break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const evaluation = this.minimax(board, depth - 1, true, alpha, beta);
                    board[i] = '';
                    minEval = Math.min(minEval, evaluation);
                    beta = Math.min(beta, evaluation);
                    if (beta <= alpha) break;
                }
            }
            return minEval;
        }
    }

    evaluateBoard(board) {
        let score = 0;
        
        winningConditions.forEach(condition => {
            const line = condition.map(index => board[index]);
            score += this.evaluateLine(line);
        });
        
        return score;
    }

    evaluateLine(line) {
        let score = 0;
        const oCount = line.filter(cell => cell === 'O').length;
        const xCount = line.filter(cell => cell === 'X').length;
        const emptyCount = line.filter(cell => cell === '').length;
        
        if (oCount === 3) score += 100;
        else if (oCount === 2 && emptyCount === 1) score += 10;
        else if (oCount === 1 && emptyCount === 2) score += 1;
        
        if (xCount === 3) score -= 100;
        else if (xCount === 2 && emptyCount === 1) score -= 10;
        else if (xCount === 1 && emptyCount === 2) score -= 1;
        
        return score;
    }

    checkWinner(board) {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        if (board.every(cell => cell !== '')) {
            return 'tie';
        }
        
        return null;
    }

    getBestMove(board, difficulty) {
        const config = aiConfig[difficulty];
        const availableMoves = board.map((cell, index) => cell === '' ? index : null)
                                  .filter(index => index !== null);
        
        if (availableMoves.length === 0) return null;

        if (Math.random() < config.randomChance) {
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }

        let bestMove = -1;
        let bestValue = -Infinity;

        for (let move of availableMoves) {
            board[move] = 'O';
            const moveValue = this.minimax([...board], config.depth, false);
            board[move] = '';

            if (moveValue > bestValue) {
                bestValue = moveValue;
                bestMove = move;
            }
        }

        return bestMove;
    }

    async makeMove() {
        if (!gameState.isGameActive || !gameState.isAITurn) return;

        this.isThinking = true;
        document.body.classList.add('ai-thinking');
        updateStatusDisplay();

        const thinkingTime = Math.random() * 1000 + 500;
        await new Promise(resolve => setTimeout(resolve, thinkingTime));

        const bestMove = this.getBestMove([...gameState.board], gameState.aiDifficulty);
        
        if (bestMove !== null && bestMove !== -1) {
            makeMove(bestMove);
        }

        this.isThinking = false;
        document.body.classList.remove('ai-thinking');
    }
}

const aiPlayer = new AIPlayer();

function initializeGame() {
    console.log('🎮 Inicializando Tic Tac Toe...');
    
    loadGameState();
    setupEventListeners();
    updateDisplay();
    updateTheme();
    loadGameHistory();
    
    console.log('✅ Juego inicializado correctamente');
}

function setupEventListeners() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
        
        if (gameState.settings.soundEffects) {
            cell.addEventListener('mouseenter', () => {
                if (gameState.board[index] === '' && gameState.isGameActive) {
                    soundManager.play('hover');
                }
            });
        }
    });

    resetButton.addEventListener('click', resetGame);
    resetScoreButton.addEventListener('click', resetScore);
    clearHistoryButton.addEventListener('click', clearHistory);

    difficultySelect.addEventListener('change', handleDifficultyChange);
    playerXNameInput.addEventListener('input', handlePlayerNameChange);
    playerONameInput.addEventListener('input', handlePlayerNameChange);
    themeSelect.addEventListener('change', handleThemeChange);
    soundEffectsCheckbox.addEventListener('change', handleSoundToggle);
    animationsCheckbox.addEventListener('change', handleAnimationToggle);

    document.addEventListener('keydown', handleKeyPress);
}

function handleCellClick(index) {
    if (gameState.board[index] !== '' || !gameState.isGameActive || gameState.isAITurn) {
        return;
    }

    makeMove(index);
}

function makeMove(index) {
    gameState.board[index] = gameState.currentPlayer;
    
    const cell = cells[index];
    cell.textContent = gameState.currentPlayer;
    cell.classList.add('filled', gameState.currentPlayer.toLowerCase());
    
    if (gameState.settings.animations) {
        cell.style.animation = 'cellFill 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    if (gameState.settings.soundEffects) {
        soundManager.play('click');
    }

    const gameResult = checkGameState();
    
    if (gameResult) {
        handleGameEnd(gameResult);
    } else {
        switchPlayer();
        
        if (gameState.gameMode === 'vsAI' && gameState.currentPlayer === 'O') {
            gameState.isAITurn = true;
            setTimeout(() => aiPlayer.makeMove(), 100);
        }
    }
}

function checkGameState() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState.board[a] && 
            gameState.board[a] === gameState.board[b] && 
            gameState.board[a] === gameState.board[c]) {
            
            return {
                result: 'win',
                winner: gameState.board[a],
                winningCells: condition,
                movesCount: gameState.board.filter(cell => cell !== '').length
            };
        }
    }
    
    if (gameState.board.every(cell => cell !== '')) {
        return {
            result: 'tie',
            winner: null,
            winningCells: [],
            movesCount: 9
        };
    }
    
    return null;
}

function handleGameEnd(result) {
    gameState.isGameActive = false;
    gameState.isAITurn = false;
    
    if (result.winningCells.length > 0) {
        result.winningCells.forEach(index => {
            cells[index].classList.add('winning');
        });
    }
    
    if (result.result === 'win') {
        gameState.scores[result.winner]++;
        updateScoreDisplay();
    }
    
    showGameMessage(result);
    
    if (gameState.settings.soundEffects) {
        if (result.result === 'win') {
            if (gameState.gameMode === 'vsAI') {
                soundManager.play(result.winner === 'X' ? 'win' : 'lose');
            } else {
                soundManager.play('win');
            }
        } else {
            soundManager.play('tie');
        }
    }
    
    storageManager.saveGameHistory(result);
    gameState.gamesPlayed++;
    
    saveGameState();
    addToHistoryDisplay(result);
    
    if (gameState.settings.animations && result.result === 'win') {
        document.body.classList.add('celebration');
        setTimeout(() => document.body.classList.remove('celebration'), 600);
    }
}

function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    gameState.isAITurn = false;
    updateStatusDisplay();
}

function resetGame() {
    gameState.board = ['', '', '', '', '', '', '', '', ''];
    gameState.currentPlayer = 'X';
    gameState.isGameActive = true;
    gameState.isAITurn = false;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
        cell.style.animation = '';
    });
    
    hideGameMessage();
    updateStatusDisplay();
    
    if (gameState.settings.soundEffects) {
        soundManager.play('reset');
    }
    
    saveGameState();
    console.log('🔄 Juego reiniciado');
}

function resetScore() {
    gameState.scores = { X: 0, O: 0 };
    gameState.gamesPlayed = 0;
    updateScoreDisplay();
    saveGameState();
    
    if (gameState.settings.soundEffects) {
        soundManager.play('reset');
    }
    
    console.log('📊 Puntuaciones reiniciadas');
}

function updateDisplay() {
    updateStatusDisplay();
    updateScoreDisplay();
    updatePlayerNames();
    updateSettings();
}

function updateStatusDisplay() {
    const playerName = gameState.playerNames[gameState.currentPlayer];
    currentPlayerSpan.textContent = gameState.currentPlayer;
    currentPlayerSpan.className = `player-indicator ${gameState.isAITurn ? 'ai-turn' : ''}`;
    
    const statusLabel = statusDisplay.querySelector('.status-label');
    if (gameState.isAITurn) {
        statusLabel.textContent = '🤖 IA está pensando...';
    } else if (!gameState.isGameActive) {
        statusLabel.textContent = 'Juego terminado';
    } else {
        statusLabel.textContent = `Turno de ${playerName}:`;
    }
}

function updateScoreDisplay() {
    scoreX.textContent = gameState.scores.X;
    scoreO.textContent = gameState.scores.O;
    
    const playerNameElements = document.querySelectorAll('.player-name');
    if (playerNameElements.length >= 2) {
        playerNameElements[0].textContent = gameState.playerNames.X;
        playerNameElements[1].textContent = gameState.playerNames.O;
    }
}

function updatePlayerNames() {
    playerXNameInput.value = gameState.playerNames.X;
    playerONameInput.value = gameState.playerNames.O;
}

function updateSettings() {
    difficultySelect.value = gameState.gameMode === 'vsAI' ? gameState.aiDifficulty : 'disabled';
    themeSelect.value = gameState.settings.theme;
    soundEffectsCheckbox.checked = gameState.settings.soundEffects;
    animationsCheckbox.checked = gameState.settings.animations;
}

function showGameMessage(result) {
    let message, emoji;
    
    if (result.result === 'win') {
        const winnerName = gameState.playerNames[result.winner];
        message = `🎉 ¡${winnerName} ha ganado!`;
        emoji = '🏆';
        gameMessage.className = 'message show winner';
    } else {
        message = '🤝 ¡Es un empate!';
        emoji = '🤷‍♂️';
        gameMessage.className = 'message show tie';
    }
    
    messageText.textContent = message;
    messageEmoji.textContent = emoji;
    
    const movesInfo = document.createElement('div');
    movesInfo.className = 'moves-info';
    movesInfo.textContent = `Movimientos: ${result.movesCount}`;
    messageText.appendChild(movesInfo);
}

function hideGameMessage() {
    gameMessage.className = 'message hidden';
}

function updateTheme() {
    document.documentElement.setAttribute('data-theme', gameState.settings.theme);
}

function loadGameHistory() {
    const history = storageManager.getGameHistory();
    updateHistoryDisplay(history);
}

function updateHistoryDisplay(history) {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">No hay partidas jugadas aún</p>';
        return;
    }
    
    historyList.innerHTML = history.map(game => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-date">${game.date}</div>
                <div class="history-players">${game.playerNames.X} vs ${game.playerNames.O}</div>
                <div class="history-moves">${game.movesCount} movimientos</div>
            </div>
            <div class="history-result ${game.result}">
                ${game.result === 'win' ? `🏆 ${game.playerNames[game.winner]}` : '🤝 Empate'}
            </div>
        </div>
    `).join('');
}

function addToHistoryDisplay(result) {
    loadGameHistory();
}

function clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar todo el historial?')) {
        storageManager.clearGameHistory();
        loadGameHistory();
        
        if (gameState.settings.soundEffects) {
            soundManager.play('reset');
        }
    }
}

function handleDifficultyChange(event) {
    const difficulty = event.target.value;
    
    if (difficulty === 'disabled') {
        gameState.gameMode = 'twoPlayer';
        gameState.playerNames.O = 'Jugador O';
    } else {
        gameState.gameMode = 'vsAI';
        gameState.aiDifficulty = difficulty;
        gameState.playerNames.O = `IA (${difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Medio' : 'Difícil'})`;
    }
    
    updateDisplay();
    saveGameState();
    resetGame();
}

function handlePlayerNameChange(event) {
    const input = event.target;
    const player = input.id === 'player-x-name' ? 'X' : 'O';
    const newName = input.value.trim() || (player === 'X' ? 'Jugador X' : 'Jugador O');
    
    gameState.playerNames[player] = newName;
    updateScoreDisplay();
    saveGameState();
}

function handleThemeChange(event) {
    gameState.settings.theme = event.target.value;
    updateTheme();
    saveGameState();
}

function handleSoundToggle(event) {
    gameState.settings.soundEffects = event.target.checked;
    soundManager.setEnabled(event.target.checked);
    saveGameState();
    
    if (event.target.checked) {
        soundManager.play('click');
    }
}

function handleAnimationToggle(event) {
    gameState.settings.animations = event.target.checked;
    
    if (!event.target.checked) {
        document.body.classList.add('no-animations');
    } else {
        document.body.classList.remove('no-animations');
    }
    
    saveGameState();
}

function handleKeyPress(event) {
    if (!gameState.isGameActive || gameState.isAITurn) return;
    
    if (event.key >= '1' && event.key <= '9') {
        const index = parseInt(event.key) - 1;
        if (gameState.board[index] === '') {
            handleCellClick(index);
        }
    }
    
    if (event.key.toLowerCase() === 'r' && event.ctrlKey) {
        event.preventDefault();
        resetGame();
    }
    
    const currentFocus = document.activeElement;
    if (currentFocus && currentFocus.classList.contains('cell')) {
        const currentIndex = Array.from(cells).indexOf(currentFocus);
        let newIndex = currentIndex;
        
        switch (event.key) {
            case 'ArrowLeft':
                newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
                break;
            case 'ArrowRight':
                newIndex = currentIndex < 8 ? currentIndex + 1 : currentIndex;
                break;
            case 'ArrowUp':
                newIndex = currentIndex >= 3 ? currentIndex - 3 : currentIndex;
                break;
            case 'ArrowDown':
                newIndex = currentIndex <= 5 ? currentIndex + 3 : currentIndex;
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                handleCellClick(currentIndex);
                return;
        }
        
        if (newIndex !== currentIndex) {
            event.preventDefault();
            cells[newIndex].focus();
        }
    }
}

function saveGameState() {
    const dataToSave = {
        scores: gameState.scores,
        playerNames: gameState.playerNames,
        settings: gameState.settings,
        gameMode: gameState.gameMode,
        aiDifficulty: gameState.aiDifficulty,
        gamesPlayed: gameState.gamesPlayed,
        lastSaved: new Date().toISOString()
    };
    
    storageManager.save(dataToSave);
}

function loadGameState() {
    const savedData = storageManager.load();
    
    if (savedData) {
        gameState.scores = savedData.scores || { X: 0, O: 0 };
        gameState.playerNames = savedData.playerNames || { X: 'Jugador X', O: 'Jugador O' };
        gameState.settings = { ...gameState.settings, ...savedData.settings };
        gameState.gameMode = savedData.gameMode || 'twoPlayer';
        gameState.aiDifficulty = savedData.aiDifficulty || 'medium';
        gameState.gamesPlayed = savedData.gamesPlayed || 0;
        
        console.log('💾 Estado del juego cargado desde localStorage');
    } else {
        console.log('🆕 Nuevo juego iniciado');
    }
    
    soundManager.setEnabled(gameState.settings.soundEffects);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    initializeGame();
}

window.addEventListener('beforeunload', saveGameState);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gameState.isAITurn = false;
    }
});

window.debugTicTacToe = {
    getGameState: () => gameState,
    resetAllData: () => {
        storageManager.clear();
        storageManager.clearGameHistory();
        location.reload();
    },
    setAIMove: (index) => {
        if (gameState.gameMode === 'vsAI' && gameState.currentPlayer === 'O') {
            makeMove(index);
        }
    },
    showAllSounds: () => {
        Object.keys(soundManager.soundFrequencies).forEach(sound => {
            console.log(`🔊 ${sound}`);
            soundManager.play(sound);
        });
    }
};

console.log('🎮 Tic Tac Toe cargado completamente');
console.log('🛠️ Usa window.debugTicTacToe para funciones de debug');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    console.log('📱 La aplicación puede ser instalada como PWA');
});

window.addEventListener('online', () => {
    console.log('🌐 Conexión restaurada');
});

window.addEventListener('offline', () => {
    console.log('📴 Modo offline activado');
});

let touchStartX, touchStartY;

document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 50) {
            console.log(deltaX > 0 ? '👈 Deslizar izquierda' : '👉 Deslizar derecha');
        }
    } else {
        if (Math.abs(deltaY) > 50) {
            console.log(deltaY > 0 ? '👆 Deslizar arriba' : '👇 Deslizar abajo');
        }
    }
    
    touchStartX = null;
    touchStartY = null;
});

console.log('✨ ¡Tic Tac Toe completamente funcional! ¡Disfruta jugando!');
