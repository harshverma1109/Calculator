 class Calculator {
            constructor(previousOperandElement, currentOperandElement) {
                this.previousOperandElement = previousOperandElement;
                this.currentOperandElement = currentOperandElement;
                this.clear();
            }

            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
            }

            delete() {
                if (this.currentOperand === '0') return;
                this.currentOperand = this.currentOperand.slice(0, -1);
                if (this.currentOperand === '' || this.currentOperand === '-') {
                    this.currentOperand = '0';
                }
            }

            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number;
                } else {
                    this.currentOperand += number;
                }
            }

            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '0';
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
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        if (current === 0) {
                            alert("Cannot divide by zero!");
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
            }

            updateDisplay() {
                this.currentOperandElement.innerText = this.currentOperand;
                if (this.operation != null) {
                    this.previousOperandElement.innerText = 
                        `${this.previousOperand} ${this.operation}`;
                } else {
                    this.previousOperandElement.innerText = '';
                }
            }
        }

        const previousOperandElement = document.getElementById('previousOperand');
        const currentOperandElement = document.getElementById('currentOperand');

        const calculator = new Calculator(previousOperandElement, currentOperandElement);

        // Update display on every action
        const originalAppendNumber = calculator.appendNumber.bind(calculator);
        calculator.appendNumber = function(number) {
            originalAppendNumber(number);
            this.updateDisplay();
        };

        const originalChooseOperation = calculator.chooseOperation.bind(calculator);
        calculator.chooseOperation = function(operation) {
            originalChooseOperation(operation);
            this.updateDisplay();
        };

        const originalCompute = calculator.compute.bind(calculator);
        calculator.compute = function() {
            originalCompute();
            this.updateDisplay();
        };

        const originalClear = calculator.clear.bind(calculator);
        calculator.clear = function() {
            originalClear();
            this.updateDisplay();
        };

        const originalDelete = calculator.delete.bind(calculator);
        calculator.delete = function() {
            originalDelete();
            this.updateDisplay();
        };

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
            if (e.key === '.') calculator.appendNumber('.');
            if (e.key === '+') calculator.chooseOperation('+');
            if (e.key === '-') calculator.chooseOperation('-');
            if (e.key === '*') calculator.chooseOperation('×');
            if (e.key === '/') {
                e.preventDefault();
                calculator.chooseOperation('÷');
            }
            if (e.key === 'Enter' || e.key === '=') calculator.compute();
            if (e.key === 'Escape') calculator.clear();
            if (e.key === 'Backspace') calculator.delete();
        });
