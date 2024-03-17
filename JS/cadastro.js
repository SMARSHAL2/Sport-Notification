class Validator {

    constructor() {
        this.validations = [
            'minlength',
            'maxlength',
            'onlyletters',
            'emailvalidate',
            'required',
            'equal',
            'passwordvalidate',
            'checkboxrequired'
        ];
    }

    validate(form) {
        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];

        inputsArray.forEach((input) => {
            this.validations.forEach((validation) => {
                let attr = 'data-' + validation.replace(/([A-Z])/g, '-$1').toLowerCase();
                let value = input.getAttribute(attr);

                if (value !== null) {
                    this[validation](input, value);
                }
            });
        });
    }

    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `Este campo é obrigatório`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `Insira seu nome verdadeiro`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = `Insira seu sobrenome verdadeiro`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = `Insira um e-mail existente`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = `As senhas não conferem`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);
        }
    }

    checkboxrequired(input) {
        if (!input.checked) {
            let errorMessage = `Você deve concordar com os termos de uso`;
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input) {
        let charArr = input.value.split("");
        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa ter pelo menos um caractere maiúsculo e um número`;
            this.printMessage(input, errorMessage);
        }
    }

    printMessage(input, msg) {
        let errorsQty = input.parentNode.querySelectorAll('.error-validation').length;

        if (errorsQty === 0) {
            let template = document.createElement('div');
            template.classList.add('error-validation');
            template.textContent = msg;

            let inputParent = input.parentNode;
            inputParent.appendChild(template);
        }
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

const validator = new Validator();
