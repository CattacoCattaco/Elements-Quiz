const MIN_GIVENS_BOX = document.getElementById("min-givens");
const MAX_GIVENS_BOX = document.getElementById("max-givens");

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

const SYMBOL = 0;
const NAME = 1;
const NUMBER = 2;
const STATE = 3;
const GROUP = 4;

const GIVEN_CHECKS = [
    document.getElementById("given-element-symbol"),
    document.getElementById("given-element-name"),
    document.getElementById("given-element-number"),
    document.getElementById("show-state"),
    document.getElementById("show-group"),
];

const ASK_CHECKS = [
    document.getElementById("ask-element-symbol"),
    document.getElementById("ask-element-name"),
    document.getElementById("ask-element-number"),
    document.getElementById("ask-state"),
    document.getElementById("ask-group"),
];

const ELEMENT_DISPLAYS = [
    ELEMENT_SYMBOL_DISPLAY,
    ELEMENT_NAME_DISPLAY,
    ELEMENT_NUMBER_DISPLAY,
];

const ELEMENT_DISPLAY_VISIBILITY_PROPERTIES = [
    "--element-symbol-visibility",
    "--element-name-visibility",
    "--element-number-visibility",
];

const ROOT = document.querySelector(':root');

class ChemElement {
    constructor(symbol, name, number, state, group) {
        this.symbol = symbol;
        this.name = name;
        this.number = number;
        this.state = state;
        this.group = group;
    }

    getProperty(propIndex) {
        switch (propIndex) {
            case SYMBOL:
                return this.symbol;
            case NAME:
                return this.name;
            case NUMBER:
                return this.number;
            case STATE:
                switch(this.state) {
                    case SOLID:
                        return "Solid";
                    case LIQUID:
                        return "Liquid";
                    case GAS:
                        return "Gas";
                }
                break;
            case GROUP:
                switch(this.group) {
                    case ALKALI_METAL:
                        return "Alkali Metal";
                    case ALKALINE_EARTH_METAL:
                        return "Alkaline Earth Metal";
                    case TRANSITION_METAL:
                        return "Transition Metal";
                    case BASIC_METAL:
                        return "Basic Metal";
                    case METALLOID:
                        return "Metalloid";
                    case NONMETAL:
                        return "Nonmetal";
                    case HALOGEN:
                        return "Halogen";
                    case NOBLE_GAS:
                        return "Noble Gas";
                    case LANTHANIDE:
                        return "Lanthanide";
                    case ACTINIDE:
                        return "Actinide";
                }
                break;
            default:
                return "";
        }
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
    new ChemElement("K", "Potassium", 19, SOLID, ALKALI_METAL),
    new ChemElement("Ca", "Calcium", 20, SOLID, ALKALINE_EARTH_METAL),
    new ChemElement("Sc", "Scandium", 21, SOLID, TRANSITION_METAL),
    new ChemElement("Ti", "Titanium", 22, SOLID, TRANSITION_METAL),
    new ChemElement("V", "Vinadium", 23, SOLID, TRANSITION_METAL),
    new ChemElement("Cr", "Chromium", 24, SOLID, TRANSITION_METAL),
    new ChemElement("Mn", "Manganese", 25, SOLID, TRANSITION_METAL),
    new ChemElement("Fe", "Iron", 26, SOLID, TRANSITION_METAL),
    new ChemElement("Co", "Cobalt", 27, SOLID, TRANSITION_METAL),
    new ChemElement("Ni", "Nickel", 28, SOLID, TRANSITION_METAL),
    new ChemElement("Cu", "Copper", 29, SOLID, TRANSITION_METAL),
    new ChemElement("Zn", "Zinc", 30, SOLID, TRANSITION_METAL),
    new ChemElement("Ga", "Gallium", 31, SOLID, BASIC_METAL),
    new ChemElement("Ge", "Germanium", 32, SOLID, METALLOID),
    new ChemElement("As", "Arsenic", 33, SOLID, METALLOID),
    new ChemElement("Se", "Selenium", 34, SOLID, NONMETAL),
    new ChemElement("Br", "Bromine", 35, LIQUID, HALOGEN),
    new ChemElement("Kr", "Krypton", 36, GAS, NOBLE_GAS),
]

let currentElement = elements[Math.floor(Math.random() * elements.length)];

let ask;

window.onload = nextQuestion;

function nextQuestion() {
    CORRECTNESS_LABEL.hidden = true;

    CHECK_BUTTON.type = "button";
    NEXT_BUTTON.type = "hidden";

    ANSWER_BOX.disabled = false;
    ANSWER_BOX.value = "";

    let possibleAsks = [];

    for(let i = SYMBOL; i <= GROUP; i++) {
        if(ASK_CHECKS[i].checked) {
            possibleAsks.push(i);
        }
    }

    ask = possibleAsks[Math.floor(Math.random() * possibleAsks.length)];

    let possibleGivens = [];

    for(let i = SYMBOL; i <= NUMBER; i++) {
        if(i != ask && GIVEN_CHECKS[i].checked) {
            possibleGivens.push(i);
        }
    }

    if(MAX_GIVENS_BOX.value < MIN_GIVENS_BOX.value) {
        MAX_GIVENS_BOX.value = MIN_GIVENS_BOX.value;
    }

    let minGivens = MIN_GIVENS_BOX.value;
    let maxGivens = MAX_GIVENS_BOX.value;
    let givenCount = Math.floor(Math.random() * (maxGivens - minGivens)) + minGivens;

    let givens = [];

    for(let i = 0; i < givenCount; i++) {
        if(possibleGivens.length > 0) {
            let givenIndex = Math.floor(Math.random() * possibleGivens.length);
            givens.push(possibleGivens[givenIndex]);
            possibleGivens.splice(givenIndex, 1);
        }
        else {
            if(ask != SYMBOL) {
                givens.push(SYMBOL);
            }
            else {
                givens.push(NAME);
            }
        }
    }

    for(let i = STATE; i <= GROUP; i++) {
        if(i != ask && GIVEN_CHECKS[i].checked) {
            givens.push(i);
        }
    }

    let isGiven = [false, false, false, false, false];

    for(let i = 0; i < givens.length; i++) {
        isGiven[givens[i]] = true;
    }

    currentElement = elements[Math.floor(Math.random() * elements.length)];

    switch(ask) {
        case SYMBOL:
            QUESTION_LABEL.innerHTML = "What is this element's symbol?";
            break;
        case NAME:
            QUESTION_LABEL.innerHTML = "What is this element's name?";
            break;
        case NUMBER:
            QUESTION_LABEL.innerHTML = "What is this element's atomic number?";
            break;
        case STATE:
            QUESTION_LABEL.innerHTML = "What is this element's state of matter at room temperature?";
            break;
        case GROUP:
            QUESTION_LABEL.innerHTML = "What group is this element found in?";
            break;
    }

    for(let i = SYMBOL; i <= NUMBER; i++) {
        if(isGiven[i]) {
            ROOT.style.setProperty(ELEMENT_DISPLAY_VISIBILITY_PROPERTIES[i], "visible");
            ELEMENT_DISPLAYS[i].innerHTML = currentElement.getProperty(i);
        }
        else {
            ROOT.style.setProperty(ELEMENT_DISPLAY_VISIBILITY_PROPERTIES[i], "hidden");
        }
    }

    if(isGiven[STATE]) {
        ROOT.style.setProperty("--state-color", STATE_COLORS[currentElement.state]);
    }
    else {
        ROOT.style.setProperty("--state-color", STATE_COLORS[SOLID]);
    }

    if(isGiven[GROUP]) {
        ROOT.style.setProperty("--group-color", GROUP_COLORS[currentElement.group]);
    }
    else {
        ROOT.style.setProperty("--group-color", GROUP_COLORS[ACTINIDE]);
    }

    if(ask != NUMBER) {
        ANSWER_BOX.type = "text";
    }
    else {
        ANSWER_BOX.type = "number";
    }
}

function checkAnswer() {
    CORRECTNESS_LABEL.hidden = false;

    CHECK_BUTTON.type = "hidden";
    NEXT_BUTTON.type = "button";

    ANSWER_BOX.disabled = true;

    if(ask != NUMBER) {
        let user_answer = ANSWER_BOX.value.toLowerCase();
        let correctAnswer = currentElement.getProperty(ask).toLowerCase();

        if(ask == GROUP) {
            user_answer = user_answer.replace(/(s|ses)$/, '');
            correctAnswer = correctAnswer.replace(/(s|ses|sses)$/, '');
        }

        if(user_answer == correctAnswer) {
            CORRECTNESS_LABEL.innerHTML = "Correct!";
        }
        else {
            CORRECTNESS_LABEL.innerHTML = "Incorrect! The correct answer was " + currentElement.getProperty(ask);
        }
    }
    else {
        if(ANSWER_BOX.value == currentElement.getProperty(ask).toString()) {
            CORRECTNESS_LABEL.innerHTML = "Correct!";
        }
        else {
            CORRECTNESS_LABEL.innerHTML = "Incorrect! The correct answer was " + currentElement.getProperty(ask).toString();
        }
    }
}