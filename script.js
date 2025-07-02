const display = document.getElementById('display');
let current = '0';
let resetNext = false;

function updateDisplay() {
  display.value = current;
}

function appendToDisplay(char) {
  if (resetNext) {
    current = (/[+\-*/%]/.test(char)) ? display.value : '';
    resetNext = false;
  }
  if (current === '0' && char !== '.') current = char;
  else current += char;
  updateDisplay();
}

function clearDisplay() {
  current = '0';
  updateDisplay();
}

function backspace() {
  current = current.slice(0, -1) || '0';
  updateDisplay();
}

function calculateResult() {
  try {
    // Evaluate using built-in math eval
    let result = eval(current.replace(/÷/g, '/').replace(/×/g, '*'));
    current = String(result);
  } catch(e) {
    current = 'Error';
  }
  resetNext = true;
  updateDisplay();
}

// Optional: allow pressing Enter for equals
display.addEventListener('keypress', e => {
  if (e.key === 'Enter') calculateResult();
});
