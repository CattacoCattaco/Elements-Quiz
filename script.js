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

const ALKALI_METAL = 0;
const ALKALINE_EARTH_METAL = 1;
const TRANSITION_METAL = 2;
const BASIC_METAL = 3;
const METALLOID = 4;
const NONMETAL = 5;
const HALOGEN = 6;
const NOBLE_GAS = 7;
const LANTHANIDE = 8;
const ACTINIDE = 9;

const GROUP_COLORS = [
    "#f66",
    "#f86",
    "#fc8",
    "#ef8",
    "#9f9",
    "#8fc",
    "#9ff",
    "#8cf",
    "#a8f",
    "#f7f",
]

const ROOT = document.querySelector(':root');

class ChemElement {
    constructor(symbol, name, number, state, group) {
        this.symbol = symbol;
        this.name = name;
        this.number = number;
        this.state = state;
        this.group = group;
    }
}

let elements = [
    new ChemElement("H", "Hydrogen", 1, GAS, NONMETAL),
    new ChemElement("He", "Helium", 2, GAS, NOBLE_GAS),
    new ChemElement("Li", "Lithium", 3, SOLID, ALKALI_METAL),
    new ChemElement("Be", "Beryllium", 4, SOLID, ALKALINE_EARTH_METAL),
    new ChemElement("B", "Boron", 5, SOLID, METALLOID),
    new ChemElement("C", "Carbon", 6, SOLID, NONMETAL),
    new ChemElement("N", "Nitrogen", 7, GAS, NONMETAL),
    new ChemElement("O", "Oxygen", 8, GAS, NONMETAL),
    new ChemElement("F", "Fluorine", 9, GAS, HALOGEN),
    new ChemElement("Ne", "Neon", 10, GAS, NOBLE_GAS),
    new ChemElement("Na", "Sodium", 11, SOLID, ALKALI_METAL),
    new ChemElement("Mg", "Magnesium", 12, SOLID, ALKALINE_EARTH_METAL),
    new ChemElement("Al", "Aluminum", 13, SOLID, BASIC_METAL),
    new ChemElement("Si", "Silicon", 14, SOLID, METALLOID),
    new ChemElement("P", "Phosphorus", 15, SOLID, NONMETAL),
    new ChemElement("S", "Sulfur", 16, SOLID, NONMETAL),
    new ChemElement("Cl", "Clorine", 17, GAS, HALOGEN),
    new ChemElement("Ar", "Argon", 18, GAS, NOBLE_GAS),
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
    ROOT.style.setProperty("--group-color", GROUP_COLORS[currentElement.group]);
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