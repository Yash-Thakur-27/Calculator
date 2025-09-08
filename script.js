 let display = document.getElementById('display');
        let currentInput = '';
        let operator = '';
        let previousInput = '';
        let shouldResetDisplay = false;

        function appendToDisplay(value) {
            if (shouldResetDisplay) {
                display.value = '';
                shouldResetDisplay = false;
            }

            
            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '' && operator !== '' && previousInput !== '') {
                    calculate();
                }
                previousInput = display.value || currentInput;
                operator = value;
                currentInput = '';
                shouldResetDisplay = true;
                return;
            }

            if (value === '.') {
                if (display.value.includes('.')) {
                    return; 
                }
                if (display.value === '') {
                    display.value = '0.';
                    return;
                }
            }

            if (display.value === '0' && value !== '.') {
                display.value = value;
            } else {
                display.value += value;
            }
            
            currentInput = display.value;
        }

        function clearDisplay() {
            display.value = '';
            currentInput = '';
            operator = '';
            previousInput = '';
            shouldResetDisplay = false;
        }

        function deleteLast() {
            if (display.value.length > 0) {
                display.value = display.value.slice(0, -1);
                currentInput = display.value;
            }
        }

        function calculate() {
            if (previousInput === '' || currentInput === '' || operator === '') {
                return;
            }

            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        display.value = 'Error';
                        shouldResetDisplay = true;
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }
            result = Math.round(result * 100000000) / 100000000;
            
            display.value = result;
            currentInput = result.toString();
            operator = '';
            previousInput = '';
            shouldResetDisplay = true;
        }
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '.') {
                appendToDisplay('.');
            } else if (['+', '-', '*', '/'].includes(key)) {
                appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            }
        });