export function enableFormValidation() {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setFormInputListeners(formElement);
  });
}

function setFormInputListeners(formElement) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем validateInput,
      // передав ей форму и проверяемый элемент
      validateInput(formElement, inputElement);
    });
  });
}

function validateInput(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement) {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

export function clearValidation(popupElement) {
  const formElement = popupElement.querySelector(".popup__form");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}
