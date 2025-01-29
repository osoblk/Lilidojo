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
            localStorage.setItem(`${character}_moves`, JSON.stringify(moveData)); // Cache for offline use
            populateMoves();
        })
        .catch(() => {
            console.log("Loading from offline storage...");
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

// Display move details when selected
function displayMoveDetails() {
    let moveName = document.getElementById("move-list").value;
    if (!moveName) return;

    let selectedMove;
    for (let key in moveData) {
        selectedMove = moveData[key].find(m => m.name === moveName);
        if (selectedMove) break;
    }

    if (!selectedMove) return;

    document.getElementById("move-name").textContent = selectedMove.name || "N/A";
    document.getElementById("move-command").textContent = selectedMove.command || "N/A";
    document.getElementById("move-start").textContent = selectedMove.start_frame || "N/A";
    document.getElementById("move-guard").textContent = selectedMove.guard_frame || "N/A";
    document.getElementById("move-hit").textContent = selectedMove.hit_frame || "N/A";
    document.getElementById("move-counter").textContent = selectedMove.counter_frame || "N/A";
    document.getElementById("move-damage").textContent = selectedMove.damage || "N/A";
    document.getElementById("move-extra").textContent = selectedMove.extra || "N/A";
}

// Event Listeners
document.getElementById("character-select").addEventListener("change", loadCharacterMoves);
document.getElementById("move-category").addEventListener("change", populateMoves);
document.getElementById("frame-filter").addEventListener("change", populateMoves);
document.getElementById("move-search").addEventListener("keyup", populateMoves);
document.getElementById("move-list").addEventListener("change", displayMoveDetails);
