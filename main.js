const user = localStorage.getItem("user");
        let LoggedInUser=document.getElementById("LoggedInUser");
        if(user){
            const parsedUser = JSON.parse(user);
            LoggedInUser.innerHTML=`&#128512; ${parsedUser.name}`;

            
        }
const typingTestSentences = [
    "The quick brown fox jumps over the lazy dog. It barked as the fox ran by swiftly. The weather was clear, and the sun shone brightly. Birds chirped in the distance, filling the air with life. A gentle breeze moved the leaves on the trees. The distant sound of children playing could be heard. It was a peaceful, sunny afternoon.",
    "A small boat sailed across the calm lake. The water shimmered under the setting sun, reflecting the sky. Fishermen cast their lines patiently, waiting for a bite. In the distance, a heron flew gracefully over the reeds. The sound of paddles hitting the water was soothing. A lone fish jumped out of the water, causing ripples. Evening slowly descended over the tranquil scene.",
    "She read her favorite book by the fireplace. The crackling sound of burning wood filled the room. Outside, the snow was gently falling, covering the ground. Winter evenings like this were her favorite time to relax. She sipped her hot chocolate, savoring the warmth. The firelight flickered across the walls, creating a cozy atmosphere. Everything seemed perfectly peaceful in that moment.",
    "The city was alive with the hum of activity. Cars honked as they sped by on busy streets. Street vendors shouted to attract customers with their goods. Lights from the buildings glowed against the darkening sky. The aroma of street food filled the air, tempting passersby. People hurried about their business, lost in their own world. The city's energy never seemed to fade, even at night.",
    "In the middle of the forest, the campers set up their tents. A fire was built to keep them warm as night fell. The stars appeared one by one in the clear sky, twinkling above. The sound of crickets surrounded them, creating a soothing background. The scent of pine trees filled the air, mingling with the smoke from the fire. They shared stories and laughed, enjoying the serenity of nature. The quiet moments made the experience even more magical.",
    "The train raced through the countryside, past fields and villages. Passengers gazed out of the windows, lost in thought or conversation. A soft murmur of voices filled the cabin, blending with the rhythmic clatter of the train. Sunlight streamed in, casting a golden glow on everything it touched. Soon, the landscape began to change as they neared the city. The peaceful countryside gave way to towering buildings. The journey was coming to an end, but the memories lingered.",
    "He walked along the sandy beach, leaving footprints behind him. The waves gently lapped at the shore, pulling the sand with them. A seagull cried out as it flew overhead, circling in the sky. The sun began to set, painting the sky with vibrant shades of orange and pink. The salty air filled his lungs as he breathed in deeply. He could hear the distant laughter of children playing by the water. The peacefulness of the scene was calming.",
    "A cat sat perched on the windowsill, watching the world outside. Leaves rustled in the wind, and people passed by on the sidewalk. The house was quiet, except for the ticking of a clock. The cat stretched lazily and curled up for a nap, its tail twitching slightly. Outside, birds chirped as they fluttered from tree to tree. The afternoon sun cast long shadows across the room. It was a perfectly ordinary but content day.",
    "The garden was bursting with color from blooming flowers. Bees buzzed from plant to plant, gathering nectar in the warm sun. A gentle breeze swayed the branches of the trees, making the leaves dance. The scent of fresh blossoms filled the air, sweet and fragrant. Butterflies fluttered by, adding to the vibrant life of the garden. The peaceful surroundings made it the perfect spot to relax. Nature was at its finest, full of beauty and life.",
    "He opened the door to the old library, and the smell of books greeted him. Rows of shelves stretched as far as the eye could see, filled with books of every kind. Dust particles floated in the sunlight that streamed through the windows, creating a magical atmosphere. The library was quiet, save for the faint rustle of pages being turned. It was a place of quiet and knowledge, where time seemed to stand still. He loved spending hours here, getting lost in stories from all over the world. The world outside faded away in the presence of so many books."
];




let currentSentence = "";
let timer = 60;
let interval;
let isTyping = false;
let correctChars = 0;
let totalChars = 0;
let totalErrors = 0;

document.addEventListener("DOMContentLoaded", function() {
    resetTest();
});

function resetTest() {
    const randomIndex = Math.floor(Math.random() * typingTestSentences.length);
    currentSentence = typingTestSentences[randomIndex];
    displayTextWithHighlights(""); 
    document.getElementById("typed-input").value = "";
    document.getElementById("typed-input").disabled = false;
    timer = 60;
    correctChars = 0;
    totalChars = 0;
    totalErrors = 0;
    isTyping = false;
    document.getElementById("timer").textContent = timer;
    document.getElementById("speed").textContent = 0;
    document.getElementById("accuracy").textContent = 100;
    clearInterval(interval);

    
    document.querySelector(".result").style.display = "none";
}

function startTimer() {
    interval = setInterval(function() {
        if (timer > 0) {
            timer--;
            document.getElementById("timer").textContent = timer;
        } else {
            clearInterval(interval);
            document.getElementById("typed-input").disabled = true;
            displayResults();
        }
    }, 1000);
}

function checkTyping() {
    if (!isTyping) {
        startTimer();
        isTyping = true;
    }

    const typedText = document.getElementById("typed-input").value;
    totalChars = typedText.length;
    correctChars = countCorrectChars(typedText);

    totalErrors = totalChars - correctChars; 
    const accuracy = (correctChars / totalChars) * 100 || 100;
    const speed = calculateWPM(totalChars);

    document.getElementById("accuracy").textContent = accuracy.toFixed(2);
    document.getElementById("speed").textContent = speed;

    displayTextWithHighlights(typedText);
}

function countCorrectChars(typedText) {
    let correct = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentSentence[i]) {
            correct++;
        }
    }
    return correct;
}

function calculateWPM(charsTyped) {
    const wordsTyped = charsTyped / 5;
    const minutesElapsed = (60 - timer) / 60;
    return Math.round(wordsTyped / minutesElapsed) || 0;
}

function displayTextWithHighlights(typedText) {
    let highlightedText = "";
    for (let i = 0; i < currentSentence.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === currentSentence[i]) {
                highlightedText += `<span class="correct-char">${currentSentence[i]}</span>`;
            } else {
                highlightedText += `<span class="error-char">${currentSentence[i]}</span>`;
            }
        } else {
            highlightedText += currentSentence[i];
        }
    }
    document.getElementById("text-to-type").innerHTML = highlightedText;
}

function displayResults() {
    document.getElementById("final-speed").textContent = calculateWPM(totalChars);
    document.getElementById("final-accuracy").textContent = ((correctChars / totalChars) * 100).toFixed(2);
    document.getElementById("total-errors").textContent = totalErrors;

    
    document.querySelector(".result").style.display = "block";
}

