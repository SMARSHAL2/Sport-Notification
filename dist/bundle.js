/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./JS/cadastro.js":
/*!************************!*\
  !*** ./JS/cadastro.js ***!
  \************************/
/***/ (() => {

eval("class Validator {\r\n\r\n  constructor() {\r\n      this.validations = [\r\n          'data-min-length',\r\n          'data-max-length',\r\n          'data-only-letters',\r\n          'data-email-validate',\r\n          'data-required',\r\n          'data-equal',\r\n          'data-password-validate',\r\n          'data-checkbox-required'\r\n      ]\r\n  }\r\n\r\n  // inicia a validação de todos os campos\r\n  validate(form) {\r\n\r\n      // limpa todas as validações antigas\r\n      let currentValidations = document.querySelectorAll('form .error-validation');\r\n\r\n      if (currentValidations.length) {\r\n          this.cleanValidations(currentValidations);\r\n      }\r\n\r\n      // pegar todos inputs\r\n      let inputs = form.getElementsByTagName('input');\r\n      // transformar HTMLCollection em arr\r\n      let inputsArray = [...inputs];\r\n\r\n      // loop nos inputs e validação mediante aos atributos encontrados\r\n      inputsArray.forEach(function(input, obj) {\r\n\r\n          // fazer validação de acordo com o atributo do input\r\n          for (let i = 0; this.validations.length > i; i++) {\r\n              if (input.getAttribute(this.validations[i]) != null) {\r\n\r\n                  // limpa string para saber o método\r\n                  let method = this.validations[i].replace(\"data-\", \"\").replace(\"-\", \"\");\r\n\r\n                  // valor do input\r\n                  let value = input.getAttribute(this.validations[i])\r\n\r\n                  // invoca o método\r\n                  this[method](input, value);\r\n\r\n              }\r\n          }\r\n\r\n      }, this);\r\n\r\n  }\r\n\r\n  // método para validar se tem um mínimo de caracteres\r\n  minlength(input, minValue) {\r\n\r\n      let inputLength = input.value.length;\r\n\r\n      let errorMessage = `Este campo é obrigatório`;\r\n\r\n      if (inputLength < minValue) {\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n\r\n  }\r\n\r\n  // método para validar se passou do máximo de caracteres\r\n  maxlength(input, maxValue) {\r\n\r\n      let inputLength = input.value.length;\r\n\r\n      let errorMessage = `Insira seu nome verdadeiro`;\r\n\r\n      if (inputLength > maxValue) {\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n\r\n  }\r\n\r\n  // método para validar strings que só contem letras\r\n  onlyletters(input) {\r\n\r\n      let re = /^[A-Za-z]+$/;;\r\n\r\n      let inputValue = input.value;\r\n\r\n      let errorMessage = `Insira seu sobrenome verdadeiro`;\r\n\r\n      if (!re.test(inputValue)) {\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n\r\n  }\r\n\r\n  // método para validar e-mail\r\n  emailvalidate(input) {\r\n      let re = /\\S+@\\S+\\.\\S+/;\r\n\r\n      let email = input.value;\r\n\r\n      let errorMessage = `Insira um e-mail existente`;\r\n\r\n      if (!re.test(email)) {\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n\r\n  }\r\n\r\n  // verificar se um campo está igual o outro\r\n  equal(input, inputName) {\r\n\r\n      let inputToCompare = document.getElementsByName(inputName)[0];\r\n\r\n      let errorMessage = `As senhas não conferem`;\r\n\r\n      if (input.value != inputToCompare.value) {\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n  }\r\n\r\n  // método para exibir inputs que são necessários\r\n  required(input) {\r\n\r\n      let inputValue = input.value;\r\n\r\n      if (inputValue === '') {\r\n          let errorMessage = `Este campo é obrigatório`;\r\n\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n\r\n  }\r\n\r\n  // Validar checkbox\r\n  checkboxrequired(input) {\r\n      if (!input.checked) {\r\n          let errorMessage = `Você deve concordar com os termos de uso`;\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n  }\r\n\r\n\r\n  // validando o campo de senha\r\n  passwordvalidate(input) {\r\n\r\n      // explodir string em array\r\n      let charArr = input.value.split(\"\");\r\n\r\n      let uppercases = 0;\r\n      let numbers = 0;\r\n\r\n      for (let i = 0; charArr.length > i; i++) {\r\n          if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {\r\n              uppercases++;\r\n          } else if (!isNaN(parseInt(charArr[i]))) {\r\n              numbers++;\r\n          }\r\n      }\r\n\r\n      if (uppercases === 0 || numbers === 0) {\r\n          let errorMessage = `A senha precisa ter pelo menos um caractere maiúsculo e um número`;\r\n\r\n          this.printMessage(input, errorMessage);\r\n      }\r\n\r\n  }\r\n\r\n  // método para imprimir mensagens de erro\r\n  printMessage(input, msg) {\r\n\r\n      // checa os erros presentes no input\r\n      let errorsQty = input.parentNode.querySelector('.error-validation');\r\n\r\n      // imprimir erro só se não tiver erros\r\n      if (errorsQty === null) {\r\n          let template = document.querySelector('.error-validation').cloneNode(true);\r\n\r\n          template.textContent = msg;\r\n\r\n          let inputParent = input.parentNode;\r\n\r\n          template.classList.remove('template');\r\n\r\n          inputParent.appendChild(template);\r\n      }\r\n\r\n  }\r\n\r\n  // remove todas as validações para fazer a checagem novamente\r\n  cleanValidations(validations) {\r\n      validations.forEach(el => el.remove());\r\n  }\r\n\r\n}\r\n\r\nlet form = document.getElementById('register-form');\r\nlet submit = document.getElementById('btn-submit');\r\n\r\nlet validator = new Validator();\r\n\r\n// evento de envio do form, que valida os inputs\r\nsubmit.addEventListener('click', function(e) {\r\n  e.preventDefault();\r\n  validator.validate(form);\r\n  // Verifica se todas as validações foram passadas\r\n  if (form.querySelectorAll('.error-validation').length === 0) {\r\n      // Se sim, enviar os dados para o servidor\r\n      enviarDados();\r\n  }\r\n});\r\n\r\n// Função para enviar os dados para o servidor\r\nfunction enviarDados() {\r\n    // Obtém os dados do formulário\r\n    let formData = new FormData(form);\r\n\r\n    // Envia os dados para o servidor via AJAX\r\n    fetch('/cadastro', {\r\n            method: 'POST',\r\n            body: formData\r\n        })\r\n        .then(response => {\r\n            // Verifica se a resposta do servidor foi bem-sucedida\r\n            if (response.ok) {\r\n                // Redireciona para a página inicial\r\n                window.location.href = \"../HTML/Main.html\";\r\n            } else {\r\n                // Se a resposta do servidor não foi bem-sucedida, exibe uma mensagem de erro\r\n                console.error('Erro ao salvar os dados:', response.statusText);\r\n                // Exibe o corpo da resposta do servidor, se houver, para ajudar a diagnosticar o problema\r\n                response.text().then(text => console.error('Corpo da resposta:', text));\r\n            }\r\n        })\r\n        .catch(error => {\r\n            // Se ocorrer um erro durante a solicitação, exibe o erro\r\n            console.error('Erro ao salvar os dados:', error);\r\n        });\r\n}\n\n//# sourceURL=webpack://esports-project/./JS/cadastro.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/cadastro.js"]();
/******/ 	
/******/ })()
;