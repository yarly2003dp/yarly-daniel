/**
 * JUEGO DEL AHORCADO - LÓGICA PRINCIPAL
 * ====================================
 */

class HangmanGame {
    constructor() {
        this.currentWord = '';
        this.currentHint = '';
        this.currentCategory = '';
        this.guessedWord = [];
        this.wrongGuesses = 0;
        this.usedLetters = new Set();
        this.gameActive = false;
        this.hintUsed = false;
        this.currentScore = 0;
        
        // Elementos del DOM
        this.elements = {
            categoryButtons: document.getElementById('categoryButtons'),
            currentCategoryIcon: document.getElementById('currentCategoryIcon'),
            currentCategoryName: document.getElementById('currentCategoryName'),
            wordDisplay: document.getElementById('wordDisplay'),
            attemptsLeft: document.getElementById('attemptsLeft'),
            totalScore: document.getElementById('totalScore'),
            categoryScore: document.getElementById('categoryScore'),
            hintButton: document.getElementById('hintButton'),
            hintDisplay: document.getElementById('hintDisplay'),
            newGameButton: document.getElementById('newGameButton'),
            resetScoresButton: document.getElementById('resetScoreButton'),
            resultModal: document.getElementById('resultModal'),
            resultTitle: document.getElementById('resultTitle'),
            resultMessage: document.getElementById('resultMessage'),
            resultStats: document.getElementById('resultStats'),
            continueButton: document.getElementById('continueButton'),
            categoryStats: document.getElementById('categoryStats'),
            keys: document.querySelectorAll('.key')
        };

        // Partes del ahorcado
        this.hangmanParts = [
            'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'
        ];

        this.init();
    }

    init() {
        this.loadScores();
        this.setupEventListeners();
        this.generateCategoryButtons();
        this.updateDisplay();
        this.updateStats();
    }

    setupEventListeners() {
        // Botones de categorías
        this.elements.categoryButtons.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-button')) {
                this.selectCategory(e.target.dataset.category);
            }
        });

        // Teclado virtual
        this.elements.keys.forEach(key => {
            key.addEventListener('click', () => {
                this.guessLetter(key.dataset.letter);
            });
        });

        // Teclado físico
        document.addEventListener('keydown', (e) => {
            const letter = e.key.toUpperCase();
            if (/^[A-ZÑ]$/.test(letter) && this.gameActive) {
                this.guessLetter(letter);
            }
        });

        // Botones de control
        this.elements.hintButton.addEventListener('click', () => this.showHint());
        this.elements.newGameButton.addEventListener('click', () => this.startNewGame());
        this.elements.resetScoresButton.addEventListener('click', () => this.resetAllScores());
        this.elements.continueButton.addEventListener('click', () => this.closeModal());

        // Cerrar modal al hacer clic fuera
        this.elements.resultModal.addEventListener('click', (e) => {
            if (e.target === this.elements.resultModal) {
                this.closeModal();
            }
        });
    }

    generateCategoryButtons() {
        const categories = getAllCategories();
        this.elements.categoryButtons.innerHTML = '';

        Object.keys(categories).forEach(categoryName => {
            const category = categories[categoryName];
            const button = document.createElement('button');
            button.className = 'category-button';
            button.dataset.category = categoryName;
            button.innerHTML = `${category.icon} ${categoryName}`;
            this.elements.categoryButtons.appendChild(button);
        });
    }

    selectCategory(categoryName) {
        // Actualizar botón seleccionado
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-category="${categoryName}"]`).classList.add('selected');

        this.currentCategory = categoryName;
        this.startNewGame();
    }

    startNewGame() {
        if (!this.currentCategory) {
            alert('Por favor selecciona una categoría primero');
            return;
        }

        const wordData = getRandomWord(this.currentCategory);
        if (!wordData) {
            console.error('Error al obtener palabra');
            return;
        }

        this.currentWord = wordData.word;
        this.currentHint = wordData.hint;
        this.guessedWord = Array(this.currentWord.length).fill('_');
        this.wrongGuesses = 0;
        this.usedLetters.clear();
        this.gameActive = true;
        this.hintUsed = false;
        this.currentScore = 0;

        this.updateDisplay();
        this.resetKeyboard();
        this.resetHangman();
        this.elements.hintDisplay.classList.remove('show');
        this.elements.hintButton.disabled = false;
    }

    guessLetter(letter) {
        if (!this.gameActive || this.usedLetters.has(letter)) {
            return;
        }

        this.usedLetters.add(letter);
        const keyElement = document.querySelector(`[data-letter="${letter}"]`);

        if (this.currentWord.includes(letter)) {
            // Letra correcta
            keyElement.classList.add('correct');
            
            // Actualizar palabra mostrada
            for (let i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i] === letter) {
                    this.guessedWord[i] = letter;
                    this.currentScore += GAME_CONFIG.POINTS_PER_CORRECT_LETTER;
                }
            }

            // Verificar si ganó
            if (!this.guessedWord.includes('_')) {
                this.winGame();
            }
        } else {
            // Letra incorrecta
            keyElement.classList.add('incorrect');
            this.wrongGuesses++;
            this.drawHangmanPart();

            // Verificar si perdió
            if (this.wrongGuesses >= GAME_CONFIG.MAX_WRONG_GUESSES) {
                this.loseGame();
            }
        }

        this.updateDisplay();
    }

    showHint() {
        if (this.hintUsed || !this.gameActive) return;

        this.hintUsed = true;
        this.currentScore = Math.max(0, this.currentScore - GAME_CONFIG.HINT_PENALTY);
        this.elements.hintDisplay.textContent = `💡 ${this.currentHint}`;
        this.elements.hintDisplay.classList.add('show');
        this.elements.hintButton.disabled = true;
        this.updateDisplay();
    }

    drawHangmanPart() {
        if (this.wrongGuesses <= this.hangmanParts.length) {
            const part = document.getElementById(this.hangmanParts[this.wrongGuesses - 1]);
            if (part) {
                part.style.display = 'block';
            }
        }
    }

    resetHangman() {
        this.hangmanParts.forEach(partId => {
            const part = document.getElementById(partId);
            if (part) {
                part.style.display = 'none';
            }
        });
    }

    resetKeyboard() {
        this.elements.keys.forEach(key => {
            key.classList.remove('correct', 'incorrect');
            key.disabled = false;
        });
    }

    winGame() {
        this.gameActive = false;
        
        // Calcular puntuación final
        const remainingAttempts = GAME_CONFIG.MAX_WRONG_GUESSES - this.wrongGuesses;
        const attemptsBonus = remainingAttempts * GAME_CONFIG.BONUS_PER_REMAINING_ATTEMPT;
        const noHintBonus = this.hintUsed ? 0 : GAME_CONFIG.BONUS_NO_HINTS;
        
        this.currentScore += attemptsBonus + noHintBonus;

        // Actualizar puntajes
        this.updateScore(this.currentCategory, this.currentScore);
        
        // Mostrar resultado
        this.showResult(
            '🎉 ¡Felicitaciones!',
            '¡Has adivinado la palabra correctamente!',
            {
                'Palabra': this.currentWord,
                'Puntos por letras': (this.currentWord.length * GAME_CONFIG.POINTS_PER_CORRECT_LETTER),
                'Bonus por intentos restantes': attemptsBonus,
                'Bonus sin pistas': noHintBonus,
                'Pista usada': this.hintUsed ? '❌ (-25 pts)' : '✅ (+50 pts)',
                'Total obtenido': this.currentScore
            }
        );

        this.elements.wordDisplay.classList.add('win');
    }

    loseGame() {
        this.gameActive = false;
        
        // Mostrar palabra completa
        this.guessedWord = Array.from(this.currentWord);
        
        this.showResult(
            '😔 ¡Qué lástima!',
            'No has logrado adivinar la palabra',
            {
                'La palabra era': this.currentWord,
                'Pista': this.currentHint,
                'Intentos fallidos': this.wrongGuesses,
                'Puntos obtenidos': this.currentScore
            }
        );

        this.elements.wordDisplay.classList.add('lose');
        
        // Actualizar estadísticas (aunque sea 0 puntos)
        this.updateScore(this.currentCategory, this.currentScore);
    }

    showResult(title, message, stats) {
        this.elements.resultTitle.textContent = title;
        this.elements.resultMessage.textContent = message;
        
        // Mostrar estadísticas
        let statsHtml = '';
        Object.keys(stats).forEach(key => {
            statsHtml += `<div class="stat-item"><span>${key}:</span><span>${stats[key]}</span></div>`;
        });
        this.elements.resultStats.innerHTML = statsHtml;
        
        this.elements.resultModal.classList.add('show');
    }

    closeModal() {
        this.elements.resultModal.classList.remove('show');
        this.elements.wordDisplay.classList.remove('win', 'lose');
    }

    updateScore(category, points) {
        let scores = this.getScores();
        
        if (!scores[category]) {
            scores[category] = {
                totalPoints: 0,
                gamesPlayed: 0,
                gamesWon: 0,
                averageScore: 0
            };
        }

        scores[category].totalPoints += points;
        scores[category].gamesPlayed++;
        if (points > 0) {
            scores[category].gamesWon++;
        }
        scores[category].averageScore = Math.round(scores[category].totalPoints / scores[category].gamesPlayed);

        this.saveScores(scores);
        this.updateDisplay();
        this.updateStats();
    }

    getTotalScore() {
        const scores = this.getScores();
        return Object.values(scores).reduce((total, category) => total + category.totalPoints, 0);
    }

    getCategoryScore() {
        const scores = this.getScores();
        return scores[this.currentCategory]?.totalPoints || 0;
    }

    getScores() {
        const saved = localStorage.getItem('hangmanScores');
        return saved ? JSON.parse(saved) : {};
    }

    saveScores(scores) {
        localStorage.setItem('hangmanScores', JSON.stringify(scores));
    }

    loadScores() {
        // Los puntajes se cargan automáticamente cuando se necesitan
    }

    resetAllScores() {
        if (confirm('¿Estás seguro de que quieres reiniciar todos los puntajes?')) {
            localStorage.removeItem('hangmanScores');
            this.updateDisplay();
            this.updateStats();
        }
    }

    updateDisplay() {
        // Actualizar categoría actual
        if (this.currentCategory) {
            const category = getCategoryInfo(this.currentCategory);
            this.elements.currentCategoryIcon.textContent = category.icon;
            this.elements.currentCategoryName.textContent = this.currentCategory;
        }

        // Actualizar palabra mostrada
        this.elements.wordDisplay.textContent = this.guessedWord.join(' ');

        // Actualizar intentos restantes
        this.elements.attemptsLeft.textContent = GAME_CONFIG.MAX_WRONG_GUESSES - this.wrongGuesses;

        // Actualizar puntajes
        this.elements.totalScore.textContent = this.getTotalScore().toLocaleString();
        this.elements.categoryScore.textContent = this.getCategoryScore().toLocaleString();
    }

    updateStats() {
        const scores = this.getScores();

        const categories = getAllCategories();
        let statsHtml = '';

        Object.keys(categories).forEach(categoryName => {
            const category = categories[categoryName];
            const stats = scores[categoryName] || {
                totalPoints: 0,
                gamesPlayed: 0,
                gamesWon: 0,
                averageScore: 0
            };

            const winRate = stats.gamesPlayed > 0 ? 
                Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

            statsHtml += `
                <div class="stat-card">
                    <div class="stat-header">
                        <span>${category.icon}</span>
                        <span>${categoryName}</span>
                    </div>
                    <div class="stat-item">
                        <span>Puntos totales:</span>
                        <span>${stats.totalPoints.toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <span>Partidas jugadas:</span>
                        <span>${stats.gamesPlayed}</span>
                    </div>
                    <div class="stat-item">
                        <span>Partidas ganadas:</span>
                        <span>${stats.gamesWon}</span>
                    </div>
                    <div class="stat-item">
                        <span>Tasa de victoria:</span>
                        <span>${winRate}%</span>
                    </div>
                    <div class="stat-item">
                        <span>Promedio por partida:</span>
                        <span>${stats.averageScore}</span>
                    </div>
                </div>
            `;
        });

        this.elements.categoryStats.innerHTML = statsHtml;
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que los datos del juego estén disponibles
    if (typeof GAME_CONFIG === 'undefined' || typeof WORD_CATEGORIES === 'undefined') {
        alert('Error: No se pudo cargar el archivo data.js. Asegúrate de que esté en la misma carpeta.');
        return;
    }

    // Crear instancia del juego
    window.hangmanGame = new HangmanGame();
    
    console.log('🎮 Juego del Ahorcado cargado correctamente!');
    console.log('📊 Categorías disponibles:', Object.keys(WORD_CATEGORIES).length);
});

// Función de utilidad para debug
function getGameState() {
    if (window.hangmanGame) {
        return {
            currentWord: window.hangmanGame.currentWord,
            currentCategory: window.hangmanGame.currentCategory,
            wrongGuesses: window.hangmanGame.wrongGuesses,
            currentScore: window.hangmanGame.currentScore,
            gameActive: window.hangmanGame.gameActive
        };
    }
    return null;
}