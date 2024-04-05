// script.js
let currentLevel = 0;
let startScreen = document.getElementById("start-screen");
let gameScreen = document.getElementById("game-screen");

const levels = [ 
    // Level 0
    {
        text: "You find yourself trapped inside a haunted house. You must find a way to escape!",
        choices: ["Explore the creepy hallway", "Search for a hidden passage"],
        consequences: {
            "Explore the creepy hallway": 1,
            "Search for a hidden passage": 2
        },
        image: "HauntedHouse.jpg"
    },
    // Level 1
    {
        text: "As you walk down the hallway, you hear mysterious whispers.",
        choices: ["Investigate the whispers", "Ignore and continue walking"],
        consequences: {
            "Investigate the whispers": 3,
            "Ignore and continue walking": 4
        },
        image: "Hallway.jpg"
    },
    // Level 2
    {
        text: "You discover a hidden passage behind a bookshelf.",
        choices: ["Enter the passage", "Keep exploring the hallway"],
        consequences: {
            "Enter the passage": 5,
            "Keep exploring the hallway": 1
        },
        image: "HiddenPassage.jpg"
    },
    // Level 3
    {
        text: "You follow the whispers and find a secret room with an old chest.",
        choices: ["Open the chest", "Leave the room"],
        consequences: {
            "Open the chest": 6,
            "Leave the room": 7
        },
        image: "SecretRoom.jpg"
    },
    // Level 4
    {
        text: "You ignore the whispers and continue walking, but the hallway seems to never end.",
        choices: ["Turn back and investigate the whispers", "Keep walking forward"],
        consequences: {
            "Turn back and investigate the whispers": 3,
            "Keep walking forward": 8
        },
        image: "EndlessHallway.jpg"
    },
    // Level 5
    {
        text: "The hidden passage leads you to the outside of the house. You have escaped!",
        choices: [],
        consequences: {},
        endText: "Congratulations! You have successfully escaped the haunted house.",
        image: "Congratulations.jpg"
    },
    // Level 6
    {
        text: "As you open the chest, you are engulfed in darkness. You have been consumed by the house's curse.",
        choices: [],
        consequences: {},
        endText: "Game Over",
        image: "GameOver.jpg"
    },
    // Level 7
    {
        text: "You decide to leave the room, but as you turn around, the door slams shut. You are trapped!",
        choices: [],
        consequences: {},
        endText: "Game Over",
        image: "GameOver.jpg"
    },
    // Level 8
    {
        text: "You keep walking forward but end up back where you started.",
        choices: ["Turn back and investigate the whispers", "Try a different direction"],
        consequences: {
            "Turn back and investigate the whispers": 3,
            "Try a different direction & leave the room": 7
        },
        image: "EndlessLoop.jpg"
    },
    // Level 9
    {
        text: "You find a staircase leading down to the basement.",
        choices: ["Go down the stairs", "Go back to the hallway"],
        consequences: {
            "Go down the stairs": 10,
            "Go back to the hallway": 1
        },
        image: "Staircase.jpg"
    },
    // Level 10
    {
        text: "In the basement, you encounter the ghost of the house's previous owner.",
        choices: ["Talk to the ghost", "Run away"],
        consequences: {
            "Talk to the ghost": 11,
            "Run away": 7
        },
        image: "Basement.jpg"
    },
    // Level 11
    {
        text: "The ghost reveals the secret to escaping the haunted house and sets you free.",
        choices: [],
        consequences: {},
        endText: "Congratulations! You have successfully escaped the haunted house with the help of the ghost.",
        image: "Congratulations.jpg"
    }
];

const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const imageElement = document.getElementById("level-image");
const endTextElement = document.getElementById("endText");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", startGame);

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    renderLevel(levels[currentLevel]);
}

function renderLevel(level) {
    storyElement.innerText = level.text;
    choicesElement.innerHTML = "";
    imageElement.src = level.image;
    if (level.endText) {
        endTextElement.innerText = level.endText;
    } else {
        Object.keys(level.consequences).forEach(choice => {
            const button = document.createElement("button");
            button.innerText = choice;
            button.addEventListener("click", () => {
                currentLevel = level.consequences[choice];
                renderLevel(levels[currentLevel]);
            });
            choicesElement.appendChild(button);
        });
    }
}

// function renderLevel(level) {
//     storyElement.innerText = level.text;
//     choicesElement.innerHTML = "";
//     imageElement.src = level.image;
//     if (level.endText) {
//         endTextElement.innerHTML = level.endText;
//         if (level.endText.trim() !== "") {
//             endTextElement.innerHTML += '<br><button id="restart-button">Restart Game</button>';
//             document.getElementById("restart-button").addEventListener("click", restartGame);
//         }
//     } else {
//         Object.keys(level.consequences).forEach(choice => {
//             const button = document.createElement("button");
//             button.innerText = choice;
//             button.addEventListener("click", () => {
//                 currentLevel = level.consequences[choice];
//                 renderLevel(levels[currentLevel]);
//             });
//             choicesElement.appendChild(button);
//         });
//     }
// }
function renderLevel(level) {
    storyElement.innerText = level.text;
    choicesElement.innerHTML = "";
    imageElement.src = level.image;
    if (level.endText) {
        if (level.endText.trim() !== "") {
            endTextElement.innerHTML = level.endText;
            if (level.endText === "Game Over") {
                endTextElement.style.color = "red";
            } else {
                endTextElement.style.color = "green";
            }
            endTextElement.innerHTML += '<br><button id="restart-button">Restart Game</button>';
            document.getElementById("restart-button").addEventListener("click", restartGame);
        } else {
            endTextElement.innerHTML = ""; // Clear endText if it's empty
        }
    } else {
        Object.keys(level.consequences).forEach(choice => {
            const button = document.createElement("button");
            button.innerText = choice;
            button.addEventListener("click", () => {
                currentLevel = level.consequences[choice];
                renderLevel(levels[currentLevel]);
            });
            choicesElement.appendChild(button);
        });
    }
}


function restartGame() {
    location.reload(); // Reload the entire webpage
}

// Initial display setup
startScreen.style.display = "block";
gameScreen.style.display = "none";
