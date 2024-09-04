// Отключаем автоматическое восстановление позиции прокрутки браузером
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Прокручиваем страницу в начало при перезагрузке
window.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0); // Прокручиваем к верхней части страницы
});
// Прокручиваем страницу в начало при полной загрузке
window.addEventListener('load', function() {
    window.scrollTo(0, 0); // Прокручиваем к верхней части страницы
});


const buttons = document.querySelectorAll(".section__button");
const modal = document.getElementById("contactModal");
const span = document.querySelector(".modal__close");

// Обработчик для открытия модального окна
buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        modal.style.display = "flex";
    });
});

// Закрытие модального окна при нажатии на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Получаем элементы формы, окна благодарности и кнопку
const form = document.querySelector(".modal__form");
const submitButton = form.querySelector(".modal__submit");
const thankYouModal = document.querySelector(".thank-you-modal");
const modalContent = document.querySelector(".modal__content");
const thankYouButton = document.querySelector(".thank-you-button");
const thankYouClose = document.querySelector(".thank-you__close");

// Обработчик для клика по кнопке отправки формы
submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Останавливаем отправку формы

    let hasError = false;

    // Проверяем обязательные поля
    const requiredFields = form.querySelectorAll('input[required]');
    requiredFields.forEach(function(field) {
        const fieldContainer = field.closest('.modal__field');
        const errorMessage = fieldContainer.querySelector('.modal__error-message');

        // Удаляем старое сообщение об ошибке
        if (errorMessage) {
            errorMessage.remove();
        }

        if (!field.value.trim()) {
            hasError = true;

            // Добавляем красную рамку к полю
            fieldContainer.classList.add('modal__field--error');

            // Добавляем сообщение об ошибке
            const error = document.createElement('div');
            error.classList.add('modal__error-message');
            error.textContent = 'This field is required.';
            fieldContainer.appendChild(error);
        } else {
            // Убираем красную рамку, если поле заполнено
            fieldContainer.classList.remove('modal__field--error');
        }
    });

    // Если ошибок нет, показываем окно благодарности
    if (!hasError) {
        form.style.display = "none"; // Скрываем форму

        thankYouModal.style.display = "block"; // Показываем окно с благодарностью
        modalContent.style.display = "none"; // Скрываем модальное окно
        modal.style.display = "none";

        // Закрытие окна благодарности при клике на кнопку "Super!"
        thankYouButton.addEventListener('click', function() {
            thankYouModal.style.display = "none";
            modal.style.display = "none"; // Закрываем модальное окно полностью
            form.reset(); // Сбрасываем форму после отправки
            form.style.display = "block"; // Возвращаем форму для следующего использования

        });
        // Закрытие окна благодарности при клике на thank-you__close
        thankYouClose.addEventListener('click', function() {
            thankYouModal.style.display = "none";
            modal.style.display = "none"; // Закрываем модальное окно полностью
            form.reset(); // Сбрасываем форму после отправки
            form.style.display = "block"; // Возвращаем форму для следующего использования

        });
    } else {
        // Если есть ошибки, увеличиваем высоту модального окна
        const modalWindow = document.querySelector('.modal__content');
        modalWindow.style.height = "699px"; // Устанавливаем высоту окна при ошибках

        const errorNotification = document.querySelector('.modal__error-notification');
        if (!errorNotification) {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('modal__error-notification');
            errorDiv.style.color = 'red';
            errorDiv.textContent = 'Please fill in all required fields';
            form.insertBefore(errorDiv, form.querySelector('.modal__policy'));
        }
    }
});

// Функция для маскировки ввода телефона
function maskPhone(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Убираем всё, кроме цифр

    if (value.startsWith("7")) {
        value = value.substring(1); // Убираем лишнюю 7, если она введена
    }

    let formattedValue = "+7 (" + value.substring(0, 3);

    if (value.length > 3) {
        formattedValue += ") " + value.substring(3, 6);
    }
    if (value.length > 6) {
        formattedValue += "-" + value.substring(6, 8);
    }
    if (value.length > 8) {
        formattedValue += "-" + value.substring(8, 10);
    }

    input.value = formattedValue;
}

// Применяем маску к полю ввода телефона
const phoneInput = document.querySelector('input[type="tel"]');
phoneInput.addEventListener('input', maskPhone);

// Ограничиваем ввод символов, кроме цифр
phoneInput.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!/[0-9]/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        event.preventDefault();
    }
});

// Соглашение об использовании cookies
// Получение элементов
const cookieConsent = document.getElementById('cookieConsent');
const acceptButton = document.getElementById('acceptCookies');
const declineButton = document.getElementById('declineCookies');
const closeButton = document.querySelector('.cookie-consent__close');

// Функция для скрытия баннера
function hideCookieConsent() {
    cookieConsent.style.display = 'none';
}

// Обработчик для кнопки "Accept"
acceptButton.addEventListener('click', hideCookieConsent);

// Обработчик для кнопки "Decline"
declineButton.addEventListener('click', hideCookieConsent);

// Обработчик для закрытия через крестик
closeButton.addEventListener('click', hideCookieConsent);
