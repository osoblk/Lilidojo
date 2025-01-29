let moveData = {};

// Load character moves from JSON
function loadCharacterMoves() {
    let character = document.getElementById("character-select").value;
    if (!character) return;

    let filePath = `data/${character}.json`;

    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            moveData = data.moves;
            localStorage.setItem(`${character}_moves`, JSON.stringify(moveData));
            populateMoves();
        })
        .catch(() => {
            moveData = JSON.parse(localStorage.getItem(`${character}_moves`)) || {};
            populateMoves();
        });
}

// Populate move dropdown based on filters
function populateMoves() {
    let category = document.getElementById("move-category").value;
    let frameFilter = document.getElementById("frame-filter").value;
    let searchQuery = document.getElementById("move-search").value.toLowerCase();
    let moveList = document.getElementById("move-list");

    moveList.innerHTML = '<option value="">Select a Move</option>'; 

    let filteredMoves = [];

    for (let key in moveData) {
        if (category !== "all" && key !== category) continue;

        moveData[key].forEach(move => {
            if (frameFilter === "safe" && parseInt(move.guard_frame) < 0) return;
            if (frameFilter === "plus" && parseInt(move.hit_frame) <= 0) return;
            if (frameFilter === "counter" && parseInt(move.counter_frame) <= 0) return;
            if (searchQuery && !move.name.toLowerCase().includes(searchQuery)) return;

            filteredMoves.push(move);
        });
    }

    filteredMoves.forEach(move => {
        let option = document.createElement("option");
        option.value = move.name;
        option.textContent = move.name;
        moveList.appendChild(option);
    });
}

// Open Different Training Modes
function openComboTrainer() { alert("Combo Trainer Coming Soon!"); }
function openPunishmentTrainer() { alert("Punishment Trainer Coming Soon!"); }
function openMatchupGuide() { alert("Matchup Guide Coming Soon!"); }
function openGhostTrainer() { alert("Ghost Input Trainer Coming Soon!"); }

// PWA Installation
function installPWA() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
    }
}
