const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const endScreen =
    document.getElementById("endScreen");

const game =
    document.getElementById("game");

const cat =
    document.getElementById("cat");

const item =
    document.getElementById("item");

const scoreText =
    document.getElementById("score");

const levelText =
    document.getElementById("level");

const bestText =
    document.getElementById("best");

const finalScore =
    document.getElementById("finalScore");

const finalMessage =
    document.getElementById("finalMessage");


const startButton =
    document.getElementById("startButton");

const againButton =
    document.getElementById("againButton");

const restartButton =
    document.getElementById("restartButton");

const leftButton =
    document.getElementById("leftButton");

const rightButton =
    document.getElementById("rightButton");


let score = 0;

let level = 1;

let best =
    Number(
        localStorage.getItem(
            "snzCatBest"
        )
    ) || 0;

let catX = 50;

let itemX = 50;

let itemY = 40;

let speed = 2.5;

let playing = false;

let animation;


bestText.textContent = best;


/* Show screen */

function showScreen(screen) {

    startScreen.classList.add("hidden");

    gameScreen.classList.add("hidden");

    endScreen.classList.add("hidden");

    screen.classList.remove("hidden");
}


/* Start */

function startGame() {

    showScreen(gameScreen);

    score = 0;

    level = 1;

    catX = 50;

    itemY = 40;

    speed = 2.5;

    playing = true;

    scoreText.textContent = score;

    levelText.textContent = level;

    cat.style.left =
        catX + "%";

    newItem();

    cancelAnimationFrame(animation);

    animation =
        requestAnimationFrame(gameLoop);
}


/* Move */

function moveCat(direction) {

    if (!playing) {
        return;
    }

    catX += direction * 6;

    catX =
        Math.max(
            6,
            Math.min(
                94,
                catX
            )
        );

    cat.style.left =
        catX + "%";
}


/* New item */

function newItem() {

    itemX =
        Math.random() * 88 + 6;

    itemY = -40;

    const items = [
        "🐟",
        "❤️",
        "🐟",
        "💗"
    ];

    item.textContent =
        items[
            Math.floor(
                Math.random() *
                items.length
            )
        ];

    item.style.left =
        itemX + "%";

    item.style.top =
        itemY + "px";
}


/* Collision */

function isCollision() {

    const catRect =
        cat.getBoundingClientRect();

    const itemRect =
        item.getBoundingClientRect();

    return (
        catRect.left <
        itemRect.right &&

        catRect.right >
        itemRect.left &&

        catRect.top <
        itemRect.bottom &&

        catRect.bottom >
        itemRect.top
    );
}


/* Collect */

function collectItem() {

    score++;

    scoreText.textContent =
        score;


    if (score > best) {

        best = score;

        bestText.textContent =
            best;

        localStorage.setItem(
            "snzCatBest",
            best
        );
    }


    if (
        score % 5 === 0
    ) {

        level++;

        speed += 0.6;

        levelText.textContent =
            level;
    }


    newItem();
}


/* Game loop */

function gameLoop() {

    if (!playing) {
        return;
    }


    itemY += speed;


    item.style.top =
        itemY + "px";


    if (isCollision()) {

        collectItem();
    }


    if (
        itemY >
        game.clientHeight
    ) {

        newItem();
    }


    animation =
        requestAnimationFrame(
            gameLoop
        );
}


/* Restart */

function restartGame() {

    startGame();
}


/* End */

function endGame() {

    playing = false;

    cancelAnimationFrame(
        animation
    );

    finalScore.textContent =
        score;


    if (score >= 30) {

        finalMessage.textContent =
            "وااای! تو بهترین دوست این گربه‌ای! 😻";

    } else if (score >= 15) {

        finalMessage.textContent =
            "خیلی عالی بود! 🐾💗";

    } else {

        finalMessage.textContent =
            "دفعه بعد قلب‌ها و ماهی‌های بیشتری بگیر! 🐟";
    }


    showScreen(endScreen);
}


/* Keyboard */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "ArrowLeft"
        ) {

            event.preventDefault();

            moveCat(-1);
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            event.preventDefault();

            moveCat(1);
        }
    }
);


/* Mobile buttons */

leftButton.addEventListener(
    "pointerdown",
    function() {

        moveCat(-1);
    }
);


rightButton.addEventListener(
    "pointerdown",
    function() {

        moveCat(1);
    }
);


/* Touch */

let touchX = null;


game.addEventListener(
    "touchstart",
    function(event) {

        touchX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


game.addEventListener(
    "touchmove",
    function(event) {

        if (touchX === null) {
            return;
        }


        const currentX =
            event.touches[0].clientX;


        const difference =
            currentX - touchX;


        if (
            Math.abs(
                difference
            ) > 15
        ) {

            if (
                difference > 0
            ) {

                moveCat(1);

            } else {

                moveCat(-1);
            }


            touchX =
                currentX;
        }

    },
    {
        passive: true
    }
);


game.addEventListener(
    "touchend",
    function() {

        touchX = null;

    },
    {
        passive: true
    }
);


startButton.addEventListener(
    "click",
    startGame
);


againButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    restartGame
);