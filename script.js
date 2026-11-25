
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let expression = "";
let justCalculated = false;

function updateDisplay() {
    display.value = expression || "0";
}

buttons.addEventListener("click", function(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
        expression = "";
        justCalculated = false;
    }
    else if (action === "delete") {
        expression = expression.slice(0, -1);
        justCalculated = false;
    }
    else if (action === "calculate") {
        try {
            if (!expression || !/^[0-9+\-*/. ()]+$/.test(expression)) {
                return;
            }

            const result = Function(
                '"use strict"; return (' + expression + ')'
            )();

            if (!Number.isFinite(result)) {
                throw new Error("Invalid calculation");
            }

            expression = String(Number(result.toFixed(10)));
            justCalculated = true;
        } catch {
            expression = "Error";
            justCalculated = true;
        }
    }
    else if (value !== undefined) {
        if (justCalculated && /[0-9.]/.test(value)) {
            expression = "";
        }

        if (expression === "Error") {
            expression = "";
        }

        expression += value;
        justCalculated = false;
    }

    updateDisplay();
});
