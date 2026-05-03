// Главной объект игры
const game = {
    // Состояние игры
    state: {
        score: 0,
        level: 1,
        riddleIndex: 0,
        hints: 3,
        usedHint: false,
        currentRiddle: null,
        totalRiddles: 0
    },

    // Инициализация игры
    init() {
        this.state.score = 0;
        this.state.level = 1;
        this.state.hints = 3;
        this.updateUI();
    },

    // Начать игру
    startGame() {
        this.init();
        this.showScreen('gameScreen');
        this.loadNextRiddle();
    },

    // Загрузить следующую загадку
    loadNextRiddle() {
        this.state.currentRiddle = getRandomRiddle();
        this.state.usedHint = false;

        // Обновить интерфейс
        document.getElementById('riddleImage').src = this.state.currentRiddle.image;
        document.getElementById('hint').textContent = '';
        document.getElementById('answerInput').value = '';
        document.getElementById('answerInput').focus();

        // Обновить кнопку подсказки
        const hintBtn = document.querySelector('.btn-hint');
        hintBtn.disabled = this.state.hints === 0;
        hintBtn.textContent = `💡 Подсказка (осталось: ${this.state.hints})`;
    },

    // Показать подсказку
    showHint() {
        if (this.state.usedHint || this.state.hints === 0) return;

        document.getElementById('hint').textContent = this.state.currentRiddle.hint;
        this.state.hints--;
        this.state.usedHint = true;
        this.state.score = Math.max(0, this.state.score - 10);
        this.updateUI();

        // Обновить кнопку подсказки
        const hintBtn = document.querySelector('.btn-hint');
        hintBtn.disabled = this.state.hints === 0;
        hintBtn.textContent = `💡 Подсказка (осталось: ${this.state.hints})`;
    },

    // Проверить ответ
    checkAnswer() {
        const userAnswer = document.getElementById('answerInput').value;
        const riddle = this.state.currentRiddle;

        if (!userAnswer.trim()) {
            this.showError('Пожалуйста, введите ответ!');
            return;
        }

        if (checkAnswer(userAnswer, riddle)) {
            this.answerCorrect();
        } else {
            this.answerIncorrect();
        }
    },

    // Правильный ответ
    answerCorrect() {
        // Добавить очки
        const points = this.state.usedHint ? 50 : 100;
        this.state.score += points;

        // Увеличить уровень каждые 5 правильных ответов
        this.state.riddleIndex++;
        if (this.state.riddleIndex % 5 === 0) {
            this.state.level++;
        }

        // Показать результат
        this.showResult('✅ Правильно!', 'correct');
        this.updateUI();
    },

    // Неправильный ответ
    answerIncorrect() {
        this.state.score = Math.max(0, this.state.score - 25);
        this.showResult(`❌ Неправильно! Ответ: ${this.state.currentRiddle.answer}`, 'incorrect');
        this.updateUI();
    },

    // Пропустить загадку
    skipRiddle() {
        this.state.score = Math.max(0, this.state.score - 10);
        this.showResult(`⏭️ Пропущено! Ответ: ${this.state.currentRiddle.answer}`, 'incorrect');
        this.updateUI();
    },

    // Показать результат
    showResult(message, type) {
        const resultScreen = document.getElementById('resultScreen');
        const resultMessage = document.getElementById('resultMessage');

        resultMessage.textContent = message;
        resultMessage.className = 'result-message ' + type;
        document.getElementById('finalScore').textContent = this.state.score;
        document.getElementById('finalLevel').textContent = this.state.level;

        this.showScreen('resultScreen');

        // Автоматически загрузить следующую загадку через 2 секунды
        setTimeout(() => {
            if (document.getElementById('resultScreen').classList.contains('active')) {
                this.loadNextRiddle();
                this.showScreen('gameScreen');
            }
        }, 2000);
    },

    // Показать ошибку
    showError(message) {
        alert(message);
    },

    // Обновить UI
    updateUI() {
        document.getElementById('score').textContent = this.state.score;
        document.getElementById('level').textContent = this.state.level;
    },

    // Показать экран
    showScreen(screenId) {
        // Скрыть все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Показать нужный экран
        document.getElementById(screenId).classList.add('active');
    },

    // Вернуться в меню
    backToMenu() {
        this.showScreen('menuScreen');
        this.init();
    },

    // Показать настройки
    showSettings() {
        alert('Настройки: работают в разработке');
    }
};

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
    game.init();
});
