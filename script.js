// Load matchups on page load
document.addEventListener("DOMContentLoaded", () => {
    fetch("data/matchups.json")
        .then(response => response.json())
        .then(data => populateMatchups(data));
});

// Populate character matchup dropdown
function populateMatchups(data) {
    let select = document.getElementById("character-select");
    for (let character in data.matchups) {
        let option = document.createElement("option");
        option.value = character;
        option.textContent = character;
        select.appendChild(option);
    }
}

// Show matchup strategy
document.getElementById("character-select").addEventListener("change", function() {
    let selected = this.value;
    fetch("data/matchups.json")
        .then(response => response.json())
        .then(data => {
            if (selected) {
                document.getElementById("matchup-info").innerHTML = `
                    <p><strong>Difficulty:</strong> ${data.matchups[selected].difficulty}</p>
                    <p><strong>Key Moves:</strong> ${data.matchups[selected].key_moves.join(", ")}</p>
                    <p><strong>Strategy:</strong> ${data.matchups[selected].strategy}</p>
                `;
            } else {
                document.getElementById("matchup-info").innerHTML = "";
            }
        });
});

// Punishment Trainer
function getPunish() {
    let frame = document.getElementById("move-frame").value;
    fetch("data/frame-data.json")
        .then(response => response.json())
        .then(data => {
            let result = data[frame] || "No punish found";
            document.getElementById("punish-result").innerHTML = `<p>Best Punish: ${result}</p>`;
        });
}

// Show Combos
function showCombos() {
    fetch("data/combos.json")
        .then(response => response.json())
        .then(data => {
            let list = "<ul>";
            data.combos.forEach(combo => {
                list += `<li><strong>${combo.starter}</strong> → ${combo.combo} (Damage: ${combo.damage})</li>`;
            });
            list += "</ul>";
            document.getElementById("combo-list").innerHTML = list;
        });
}

// PWA Install Prompt
function installPWA() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
    }
}
