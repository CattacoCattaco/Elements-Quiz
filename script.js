const CORRECTNESS_LABEL = document.getElementById("correctness-label");
const QUESTION_LABEL = document.getElementById("question-label");
const ELEMENT_NUMBER_DISPLAY = document.getElementById("element-number");
const ELEMENT_SYMBOL_DISPLAY = document.getElementById("element-symbol");
const ELEMENT_NAME_DISPLAY = document.getElementById("element-name");
const ANSWER_BOX = document.getElementById("answer-box");
const CHECK_BUTTON = document.getElementById("check-button");
const NEXT_BUTTON = document.getElementById("next-button");

const SOLID = 0;
const LIQUID = 1;
const GAS = 2;

const STATE_COLORS = ["#000", "#00f", "#f00"];

const ROOT = document.querySelector(':root');

class ChemElement {
    constructor(symbol, name, number, state) {
        this.symbol = symbol;
        this.name = name;
        this.number = number;
        this.state = state;
    }
}

let elements = [
    new ChemElement("H", "Hydrogen", 1, GAS),
    new ChemElement("He", "Helium", 2, GAS),
    new ChemElement("Li", "Lithium", 3, SOLID),
    new ChemElement("Be", "Beryllium", 4, SOLID),
    new ChemElement("B", "Boron", 5, SOLID),
    new ChemElement("C", "Carbon", 6, SOLID),
    new ChemElement("N", "Nitrogen", 7, GAS),
    new ChemElement("O", "Oxygen", 8, GAS),
    new ChemElement("F", "Fluorine", 9, GAS),
    new ChemElement("Ne", "Neon", 10, GAS),
    new ChemElement("Na", "Sodium", 11, SOLID),
    new ChemElement("Mg", "Magnesium", 12, SOLID),
]

let currentElement = elements[Math.floor(Math.random() * elements.length)];

window.onload = nextQuestion;

function nextQuestion() {
    CORRECTNESS_LABEL.hidden = true;

    CHECK_BUTTON.type = "button";
    NEXT_BUTTON.type = "hidden";

    ANSWER_BOX.disabled = false;
    ANSWER_BOX.value = "";

    currentElement = elements[Math.floor(Math.random() * elements.length)];

    ELEMENT_NUMBER_DISPLAY.innerHTML = currentElement.number;
    ELEMENT_SYMBOL_DISPLAY.innerHTML = currentElement.symbol;
    ELEMENT_NAME_DISPLAY.innerHTML = currentElement.name;
    ROOT.style.setProperty("--state-color", STATE_COLORS[currentElement.state]);
}

function checkAnswer() {
    CORRECTNESS_LABEL.hidden = false;

    CHECK_BUTTON.type = "hidden";
    NEXT_BUTTON.type = "button";

    ANSWER_BOX.disabled = true;

    if(ANSWER_BOX.value == currentElement.name) {
        CORRECTNESS_LABEL.innerHTML = "Correct!";
    }
    else {
        CORRECTNESS_LABEL.innerHTML = "Incorrect! The correct answer was " + currentElement.name;
    }
}