const youtubeVideoLink = "https://www.youtube.com/embed/6Q5xqNkCk7w"; // Correct video ID

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    if (passwordInput === "bali") {
        document.getElementById("passwordContainer").style.display = "none";
        document.getElementById("mainContainer").style.display = "block";
    } else {
        document.getElementById("errorMessage").innerText = "Incorrect Password";
    }
}

function showMessage() {
    document.getElementById("messageModal").style.display = "block";
}

function closeMessageModal() {
    document.getElementById("messageModal").style.display = "none";
}

function showSong() {
    document.getElementById("songModal").style.display = "block";
}

function closeSongModal() {
    document.getElementById("songModal").style.display = "none";
}

function showGift() {
    closeGiftModal(); // Ensure any existing modals are closed
    showFlowerGif(); // Show the GIF modal
}

function closeGiftModal() {
    document.getElementById("giftModal").style.display = "none";
}

function showFlowerGif() {
    const flowerModal = document.createElement('div');
    flowerModal.style.display = 'block';
    flowerModal.style.position = 'fixed';
    flowerModal.style.zIndex = '2';
    flowerModal.style.left = '0';
    flowerModal.style.top = '0';
    flowerModal.style.width = '100%';
    flowerModal.style.height = '100%';
    flowerModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    flowerModal.style.textAlign = 'center';
    flowerModal.innerHTML = `
        <span class="close" onclick="closeFlowerGif()">&times;</span>
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHh2Z2t2anRmeW51MGQ1OWJydW16ZGthdXVyNXg5Z2RldzIwM3FobiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iB6I46FbLRqsLliGpI/giphy.gif" style="max-width: 80%; margin-top: 100px;" />`;
    document.body.appendChild(flowerModal);
}

function closeFlowerGif() {
    const flowerModal = document.querySelector('div[style*="fixed"]');
    if (flowerModal) {
        document.body.removeChild(flowerModal);
    }
}

function goBack() {
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("passwordContainer").style.display = "block";
}

function hideButtonTemporarily(buttonId) {
    const button = document.getElementById(buttonId);
    button.style.display = 'none'; // Hide the button temporarily
}

function showPhoto(url) {
    const photoModal = document.createElement('div');
    photoModal.style.display = 'block';
    photoModal.style.position = 'fixed';
    photoModal.style.zIndex = '2';
    photoModal.style.left = '0';
    photoModal.style.top = '0';
    photoModal.style.width = '100%';
    photoModal.style.height = '100%';
    photoModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    photoModal.style.textAlign = 'center';
    photoModal.innerHTML = `
        <span class="close" onclick="closePhotoModal()">&times;</span>
        <img src="${url}" style="max-width: 30%; margin-top: 100px;" />`;  // Set to 30%
    document.body.appendChild(photoModal);
}

function closePhotoModal() {
    const photoModal = document.querySelector('div[style*="fixed"]');
    if (photoModal) {
        document.body.removeChild(photoModal);
    }
}
let score = 0; // To keep track of the user's score
let currentQuestion = 0; // To track the current question

function startQuiz() {
    score = 0; // Reset score for a new quiz
    currentQuestion = 1; // Start with the first question
    showQuestion();
}

function showQuestion() {
    let questionText, button1Text, button2Text, button1Func, button2Func;

    if (currentQuestion === 1) {
        questionText = "What's my favorite food?";
        button1Text = "Fried Chicken";
        button2Text = "Chicken Wings";
        button1Func = correctAnswer; // Correct answer function
        button2Func = wrongAnswer; // Wrong answer function
    } else if (currentQuestion === 2) {
        questionText = "What's my favorite drink?";
        button1Text = "Mountain Dew";
        button2Text = "Lipton";
        button1Func = correctAnswer; // Correct answer function
        button2Func = wrongAnswer; // Wrong answer function
    } else {
        displayScore(); // Display score when no more questions
        return;
    }

    const quizContainer = document.createElement('div');
    quizContainer.innerHTML = `
        <h2>${questionText}</h2>
        <button onclick="${button1Func.name}()">${button1Text}</button>
        <button onclick="${button2Func.name}()">${button2Text}</button>
    `;
    document.getElementById("mainContainer").innerHTML = ''; // Clear previous content
    document.getElementById("mainContainer").appendChild(quizContainer);
}

function correctAnswer() {
    if (score < 2) { // Ensure score doesn't exceed 2
        score++;
    }
    currentQuestion++;
    showQuestion();
}

function wrongAnswer() {
    const tryAgain = confirm("Try again?");
    if (tryAgain) {
        currentQuestion = 1; // Reset to first question
        showQuestion(); // Show the first question
    } else {
        goBackToMenu(); // Go back to main menu
    }
}

function displayScore() {
    const scoreMessage = `Your score: ${score}/2. Congrats, you passed the test!`;
    const scoreContainer = document.createElement('div');
    scoreContainer.innerHTML = `
        <h2>${scoreMessage}</h2>
        <button onclick="goBackToMenu()">Back to Menu</button>
    `;
    document.getElementById("mainContainer").innerHTML = ''; // Clear previous content
    document.getElementById("mainContainer").appendChild(scoreContainer);
}

function goBackToMenu() {
    score = 0; // Reset score for the next quiz
    currentQuestion = 0; // Reset question number

    // Show the main menu with all buttons
    document.getElementById("mainContainer").innerHTML = `
        <h2>Welcome!</h2>
        <button onclick="showMessage()">Message</button>
        <button id="songButton" onclick="showSong()">Play Song</button>
        <button onclick="showGift()">Gift</button>
        <button onclick="goBack()">Back</button>
        <button onclick="startQuiz()">Quiz</button>
    `;
}
