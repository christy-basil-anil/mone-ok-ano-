const quizData = [
    { text: "I felt cheerful, in good spirits, and generally positive about my daily life.", progressText: "Let's Get Started!" }, // 1/10
    { text: "I felt calm, relaxed, and at ease even when facing small challenges.", progressText: "Warming Up!" }, // 2/10
    { text: "I felt full of energy, motivated, and ready to carry out my daily activities.", progressText: "You're doing well" }, // 3/10
    { text: "I was able to concentrate and focus on tasks without feeling distracted or overwhelmed.", progressText: "Keep It Going!" }, // 4/10
    { text: "I felt anxious, tense, or nervous, even in situations that seemed manageable.", progressText: "Halfway There!" }, // 5/10
    { text: "I felt sad, down, or depressed, and struggled to find joy in things I usually like.", progressText: "More than halfway" }, // 6/10
    { text: "I lost interest or pleasure in hobbies, social activities, or things I normally enjoy.", progressText: "Halfway There!" }, // 7/10
    { text: "I felt overwhelmed by responsibilities, worries, or pressures in my personal or professional life.", progressText: "Almost Done!" }, // 8/10
    { text: "I was able to manage stress and cope with challenges effectively.", progressText: "One more to go" }, // 9/10
    { text: "I felt generally satisfied, content, and happy with my life.", progressText: "Final One!" } // 10/10
];

const answerChoices = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];

let currentQuestionIndex = 0;
let userAnswers = []; // Array to store the index of the selected choice for each question

// DOM Elements
const questionText = document.getElementById('question-text');
const answerOptionsDiv = document.getElementById('answer-options');
const previousBtn = document.getElementById('previous-btn');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const questionNumberSpan = document.getElementById('question-number');
const quizContainer = document.querySelector('.quiz-container');

// --- Main Functions ---

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.text}`;
    
    // Update progress
    progressText.textContent = currentQuestion.progressText;
    questionNumberSpan.textContent = `${currentQuestionIndex + 1}/${quizData.length}`;
    const progressPercentage = (currentQuestionIndex + 1) / quizData.length * 100;
    progressBar.style.width = `${progressPercentage}%`;

    renderAnswerOptions();
    
    // Update navigation button state
    previousBtn.disabled = currentQuestionIndex === 0;
}

function renderAnswerOptions() {
    answerOptionsDiv.innerHTML = '';
    const selectedAnswerIndex = userAnswers[currentQuestionIndex];

    answerChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.setAttribute('data-index', index);
        button.classList.add('answer-btn');
        
        // Add 'selected' class if this option was previously chosen
        if (selectedAnswerIndex === index) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => handleAnswerSelection(index));
        answerOptionsDiv.appendChild(button);
    });
}

function handleAnswerSelection(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;

    // Visually update the selected button
    document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`[data-index="${answerIndex}"]`).classList.add('selected');

    // Move to the next question automatically after selection
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 200); // Small delay for visual confirmation
}

function handlePrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResults() {
    // A placeholder for the results screen
    quizContainer.innerHTML = `
        <div class="results-screen">
            <div class="instructions">
                <h2>Quiz Complete! 🎉</h2>
            </div>
            <div class="question-box" style="background-color: #4CAF50;">
                <p id="question-text">Thank you for completing the assessment.</p>
            </div>
            <p>Your responses have been recorded:</p>
            <ul style="list-style-type: none; padding: 0; text-align: left; margin: 20px auto; max-width: 80%;">
                ${userAnswers.map((ansIndex, qIndex) => `
                    <li style="margin-bottom: 5px; color: #333;">
                        <strong>Q${qIndex + 1}:</strong> ${quizData[qIndex].text.substring(0, 40)}... 
                        <span style="float: right; font-weight: bold; color: #2196F3;">${answerChoices[ansIndex]}</span>
                    </li>
                `).join('')}
            </ul>
            <p class="powered-by">Powered by IDEAGORA</p>
        </div>
    `;
    // Note: A real-world scale would calculate a score based on reversed questions (5, 6, 7, 8) vs positive questions (1, 2, 3, 4, 9, 10).
}

// --- Event Listeners and Initialization ---
previousBtn.addEventListener('click', handlePrevious);

// Start the quiz
loadQuestion();