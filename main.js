const display = document.getElementById('display');
const previousOpDisplay = document.getElementById('previous-op');
const clearBtn = document.getElementById('btn-clear');

let currentInput = '0';
let previousInput = '';
let operator = null;
let resetNext = false;

function updateDisplay() {
  display.value = currentInput;
  if (currentInput !== '0') {
    clearBtn.innerText = 'C';
  } else {
    clearBtn.innerText = 'AC';
  }
}

function appendNumber(number) {
  if ((currentInput === '0' && number !== '.') || resetNext) {
    currentInput = number;
    resetNext = false;
  } else if (number === '.' && currentInput.includes('.')) {
    return;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator && !resetNext) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  resetNext = true;
  previousOpDisplay.innerText = `${previousInput} ${getOpSymbol(op)}`;
}

function getOpSymbol(op) {
  switch (op) {
    case '+': return '+';
    case '-': return '−';
    case '*': return '×';
    case '/': return '÷';
    default: return '';
  }
}

function calculate() {
  if (!operator || resetNext) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/':
      result = current === 0 ? 'Erro' : prev / current;
      break;
    default: return;
  }

  previousOpDisplay.innerText = `${previousInput} ${getOpSymbol(operator)} ${current} =`;
  currentInput = result.toString();
  operator = null;
  resetNext = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  resetNext = false;
  previousOpDisplay.innerText = '';
  updateDisplay();
}

function toggleSign() {
  if (currentInput === '0') return;
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
}

function appendPercentage() {
  if (currentInput === '0') return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}