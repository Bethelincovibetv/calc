class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetDisplay = false; // Flag to indicate if display should be reset after an operation
    }

    delete() {
        if (this.currentOperand === 'Error') {
            this.clear(); // If display is 'Error', clear completely
            return;
        }
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.currentOperand === 'Error') {
            this.currentOperand = number; // Start new number if previous was error
            this.shouldResetDisplay = false;
            return;
        }

        if (this.shouldResetDisplay) {
            this.currentOperand = number;
            this.shouldResetDisplay = false;
        } else {
            if (number === '.' && this.currentOperand.includes('.')) return;
            if (this.currentOperand === '0' && number !== '.') {
                this.currentOperand = number;
            } else {
                this.currentOperand += number;
            }
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === 'Error') return; // Cannot choose operation on error
        if (this.currentOperand === '') return; // No number to operate on

        if (this.previousOperand !== '') {
            this.compute(); // Compute previous operation if any
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetDisplay = true;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−': // Using unicode minus sign
                computation = prev - current;
                break;
            case '×': // Using unicode multiplication sign
                computation = prev * current;
                break;
            case '÷': // Using unicode division sign
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.previousOperand = '';
                    this.operation = undefined;
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetDisplay = true;
    }

    updateDisplay() {
        this.displayElement.innerText = this.currentOperand;
    }
}

const displayElement = document.querySelector('[data-display]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');

const calculator = new Calculator(displayElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        calculator.appendNumber(key);
    } else if (key === '.') {
        calculator.appendNumber(key);
    } else if (key === '+' || key === '-') {
        calculator.chooseOperation(key);
    } else if (key === '*' || key === '/') {
        calculator.chooseOperation(key === '*' ? '×' : '÷'); // Map * and / to unicode symbols
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault(); // Prevent default Enter key behavior (e.g., submitting forms)
        calculator.compute();
    } else if (key === 'Backspace') {
        calculator.delete();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        calculator.clear();
    }

    calculator.updateDisplay();
});
