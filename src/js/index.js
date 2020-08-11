import { elements } from './views/base';

console.log('connected');

let ans = '';
let calc = '';
let clear = false;
let inputHistory = '';
let unit = '';
let isLimit = false;

elements.btn.forEach(e => {
    e.addEventListener('click', e => {
        let output = e.target.value;
        if (output === '=') {
            if(!isLimit){
                if (clear === false){
                    ans = eval(calc);
                    calc += output;
                    console.log(ans);
                    elements.answer.textContent = ans;
                    elements.historyAnswer.textContent = calc + ans;
                    clear = true;
                    calc = ans;
                    ctrlAnswerLength(ans);
                    ctrlHistroyLength(elements.historyAnswer.textContent);
                }
            }
        } else if (output === 'ac') {
            output = '';
            calc = '';
            ans = '';
            inputHistory = '';
            unit = '';
            clear = false;
            elements.answer.textContent = 0;
            elements.historyAnswer.textContent = 0;
            reset();
        } else if (output === 'ce') {
            if(!isLimit){
                calc = calc.slice(0, calc.length - inputHistory.length);
                elements.answer.textContent = 0;
                inputHistory = '';
                elements.historyAnswer.textContent = elements.historyAnswer.textContent.slice(0, calc.length - inputHistory.length);
            }
        } else if (output === '/' || output === '*' || output === '-' || output === '+') {
            if(!isLimit){
                if (unit === '') {
                    unit = output;
                    calc += output;
                    elements.answer.textContent = output;
                    elements.historyAnswer.textContent = calc;
                    inputHistory = '';
                    clear = false;
                    reset();              
                } else if (unit !== output) {
                    unit = output;
                    calc = calc.slice(0, calc.length - 1);
                    elements.historyAnswer.textContent = elements.historyAnswer.textContent.slice(0, calc.length - inputHistory.length);
                    calc += output;
                    elements.answer.textContent = output;
                    elements.historyAnswer.textContent = calc;
                    clear = false; 
                    reset();         
                }
            }
        } else {
            if(!isLimit){
                calc += output;
                inputHistory += output;
                elements.answer.textContent = inputHistory;
                elements.historyAnswer.textContent = calc;
                unit = '';
                clear = false; 
                ctrlAnswerLength(inputHistory);
                ctrlHistroyLength(elements.historyAnswer.textContent);
            }
        }

    })
})



const reset = () => {
    elements.answer.classList.remove('smaller');
    elements.historyAnswer.classList.remove('smallest');
    isLimit = false;
};

const ctrlHistroyLength = input => {
    let output = input.toString();
    if (25 > output.length && output.length > 24) {
        elements.historyAnswer.classList.add('smallest');   
    } else if (output.length > 25) {
        output = output.slice(0, 25) + '...';
        elements.historyAnswer.textContent = output;
    }
};

const ctrlAnswerLength = input => {
    let output = input.toString();
    if (18 > output.length && output.length > 8) {
        elements.answer.classList.add('smaller');
    } else if (output.length > 18) {
        elements.answer.classList.remove('smaller');
        elements.answer.textContent = 'DIGIT LIMIT';
        isLimit = true;
    } else {
        return input;
    }
};
