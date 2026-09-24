"use strict";

const form = document.getElementById("sum-form");
const firstInput = document.getElementById("first-number");
const secondInput = document.getElementById("second-number");
const clearButton = document.getElementById("clear-button");
const errorMessage = document.getElementById("error-message");
const resultOutput = document.getElementById("result");

const numberFormatter = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 15
});

function clearErrors() {
    errorMessage.textContent = "";
    firstInput.classList.remove("input-error");
    secondInput.classList.remove("input-error");
    firstInput.removeAttribute("aria-invalid");
    secondInput.removeAttribute("aria-invalid");
}

function showError(input, message) {
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return message;
}

function getNumber(input, fieldName) {
    if (input.value.trim() === "") {
        return {
            isValid: false,
            message: showError(input, `Informe o ${fieldName.toLowerCase()}.`)
        };
    }

    const number = input.valueAsNumber;

    if (!Number.isFinite(number)) {
        return {
            isValid: false,
            message: showError(input, `Digite um número válido no ${fieldName.toLowerCase()}.`)
        };
    }

    return { isValid: true, value: number };
}

function addNumbers(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const firstNumber = getNumber(firstInput, "Primeiro número");

    if (!firstNumber.isValid) {
        errorMessage.textContent = firstNumber.message;
        return;
    }

    const secondNumber = getNumber(secondInput, "Segundo número");

    if (!secondNumber.isValid) {
        errorMessage.textContent = secondNumber.message;
        return;
    }

    const sum = addNumbers(firstNumber.value, secondNumber.value);

    if (!Number.isFinite(sum)) {
        resultOutput.textContent = "—";
        errorMessage.textContent = "O resultado é grande demais para ser calculado.";
        return;
    }

    resultOutput.textContent = numberFormatter.format(sum);
});

[firstInput, secondInput].forEach((input) => {
    input.addEventListener("input", () => {
        clearErrors();

        if (resultOutput.textContent !== "0") {
            resultOutput.textContent = "0";
        }
    });
});

clearButton.addEventListener("click", () => {
    clearErrors();
    resultOutput.textContent = "0";
    firstInput.focus();
});