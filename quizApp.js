/**
 * クイズアプリケーションのコアロジック
 */
class QuizApp {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.isAnswered = false;
        this.quizData = null;
        this.questionCount = 10; // 出題する問題数
        this.initializeElements();
        this.initializeEventListeners();
    }

    /**
     * DOM要素の初期化
     */
    initializeElements() {
        this.elements = {
            languageSelect: document.getElementById('language-select'),
            quizLanguage: document.getElementById('quiz-language'),
            startButton: document.getElementById('start-button'),
            quizContainer: document.getElementById('quiz-container'),
            question: document.getElementById('question'),
            pronunciation: document.getElementById('pronunciation'),
            optionsContainer: document.getElementById('options-container'),
            resultContainer: document.getElementById('result-container'),
            resultMessage: document.getElementById('result-message'),
            explanation: document.getElementById('explanation'),
            nextButton: document.getElementById('next-button'),
            currentQuestionSpan: document.getElementById('current-question'),
            finalResult: document.getElementById('final-result'),
            score: document.getElementById('score'),
            restartButton: document.getElementById('restart-button'),
            changeLanguageButton: document.getElementById('change-language')
        };
    }

    /**
     * イベントリスナーの初期化
     */
    initializeEventListeners() {
        this.elements.startButton.addEventListener('click', () => this.startQuiz());
        this.elements.nextButton.addEventListener('click', () => this.showNextQuestion());
        this.elements.restartButton.addEventListener('click', () => this.restartQuiz());
        this.elements.changeLanguageButton.addEventListener('click', () => this.showLanguageSelect());
    }

    /**
     * クイズの開始
     */
    startQuiz() {
        const language = this.elements.quizLanguage.value;
        // 言語に応じたクイズデータを取得
        const fullQuizData = this.getQuizData(language);
        if (!fullQuizData) {
            console.error('Quiz data not found for language:', language);
            return;
        }

        // ランダムに問題を選択
        this.quizData = this.getRandomQuestions(fullQuizData, this.questionCount);
        
        this.currentQuestion = 0;
        this.score = 0;
        this.elements.languageSelect.classList.add('hidden');
        this.elements.quizContainer.classList.remove('hidden');
        this.showQuestion();
    }

    /**
     * ランダムに問題を選択する
     * @param {Array} questions - 全問題データ
     * @param {number} count - 選択する問題数
     * @returns {Array} 選択された問題
     */
    getRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * 言語に応じたクイズデータの取得
     * @param {string} language - 選択された言語
     * @returns {Array} クイズデータ
     */
    getQuizData(language) {
        // グローバルスコープから言語に応じたデータを取得
        switch (language) {
            case 'chinese':
                return window.chineseQuizData;
            case 'korean':
                return window.koreanQuizData;
            case 'english':
                return window.englishQuizData;
            case 'spanish':
                return window.spanishQuizData;
            case 'vietnamese':
                return window.vietnameseQuizData;
            default:
                return null;
        }
    }

    /**
     * 問題の表示
     */
    showQuestion() {
        const current = this.quizData[this.currentQuestion];
        this.elements.currentQuestionSpan.textContent = this.currentQuestion + 1;
        this.elements.question.textContent = `「${current.question}」の意味は？`;

        // 発音表記の表示（中国語のpinyinまたは韓国語のpronunciation）
        if (current.pinyin || current.pronunciation) {
            this.elements.pronunciation.textContent = current.pinyin || current.pronunciation;
            this.elements.pronunciation.classList.remove('hidden');
        } else {
            this.elements.pronunciation.classList.add('hidden');
        }

        this.showOptions(current.options);
        this.resetResultDisplay();
    }

    /**
     * 選択肢の表示
     * @param {Array} options - 選択肢の配列
     */
    showOptions(options) {
        this.elements.optionsContainer.innerHTML = '';
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = "w-full p-4 rounded-md text-lg transition-colors bg-gray-50 text-gray-700 hover:bg-gray-100";
            button.addEventListener('click', () => this.checkAnswer(index));
            this.elements.optionsContainer.appendChild(button);
        });
    }

    /**
     * 回答のチェック
     * @param {number} selectedIndex - 選択された選択肢のインデックス
     */
    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;

        this.isAnswered = true;
        const current = this.quizData[this.currentQuestion];
        const buttons = this.elements.optionsContainer.getElementsByTagName('button');

        // 正解ボタンのスタイル更新
        buttons[current.correct].className = "w-full p-4 rounded-md text-lg transition-colors bg-green-100 text-green-700";

        if (selectedIndex === current.correct) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(buttons[selectedIndex], current.explanation);
        }
    }

    /**
     * 正解時の処理
     */
    handleCorrectAnswer() {
        this.score++;
        this.elements.resultMessage.textContent = '正解！';
        this.elements.resultMessage.className = 'text-xl font-bold mb-2 text-center text-green-600';
        setTimeout(() => {
            if (this.currentQuestion < this.questionCount - 1) {
                this.showNextQuestion();
            } else {
                this.showFinalResult();
            }
        }, 1000);
    }

    /**
     * 不正解時の処理
     * @param {HTMLElement} selectedButton - 選択されたボタン要素
     * @param {string} explanation - 解説文
     */
    handleIncorrectAnswer(selectedButton, explanation) {
        selectedButton.className = "w-full p-4 rounded-md text-lg transition-colors bg-red-100 text-red-700";
        this.elements.resultMessage.textContent = '不正解...';
        this.elements.resultMessage.className = 'text-xl font-bold mb-2 text-center text-red-600';
        this.elements.explanation.textContent = explanation;
        this.elements.resultContainer.classList.remove('hidden');
        
        if (this.currentQuestion < this.questionCount - 1) {
            this.elements.nextButton.classList.remove('hidden');
        } else {
            setTimeout(() => this.showFinalResult(), 2000);
        }
    }

    /**
     * 結果表示のリセット
     */
    resetResultDisplay() {
        this.isAnswered = false;
        this.elements.resultContainer.classList.add('hidden');
        this.elements.nextButton.classList.add('hidden');
    }

    /**
     * 次の問題の表示
     */
    showNextQuestion() {
        if (this.currentQuestion < this.questionCount - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showFinalResult();
        }
    }

    /**
     * 最終結果の表示
     */
    showFinalResult() {
        const elementsToHide = ['progress', 'question-container', 'options-container', 'result-container'];
        elementsToHide.forEach(id => {
            document.getElementById(id).style.display = 'none';
        });

        this.elements.score.textContent = this.score;
        this.elements.finalResult.classList.remove('hidden');
    }

    /**
     * クイズの再スタート
     */
    restartQuiz() {
        const elementsToShow = ['progress', 'question-container', 'options-container', 'result-container'];
        elementsToShow.forEach(id => {
            document.getElementById(id).style.display = '';
        });

        this.elements.finalResult.classList.add('hidden');
        // 新しいランダムな問題セットを取得
        const language = this.elements.quizLanguage.value;
        const fullQuizData = this.getQuizData(language);
        this.quizData = this.getRandomQuestions(fullQuizData, this.questionCount);
        
        this.currentQuestion = 0;
        this.score = 0;
        this.showQuestion();
    }

    /**
     * 言語選択画面の表示
     */
    showLanguageSelect() {
        this.elements.quizContainer.classList.add('hidden');
        this.elements.languageSelect.classList.remove('hidden');
        this.elements.finalResult.classList.add('hidden');

        const elementsToReset = ['progress', 'question-container', 'options-container', 'result-container'];
        elementsToReset.forEach(id => {
            document.getElementById(id).style.display = '';
        });
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});