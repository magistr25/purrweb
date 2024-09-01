document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevButton = document.querySelector('.control-left');
    const nextButton = document.querySelector('.control-right');
    const dotsContainer = document.querySelector('.dots-container');

    let currentSlide = 1;  // начинаем с первого реального слайда
    let isAnimating = false;
    const gap = 10;  // Постоянный промежуток между слайдами
    const slideWidth = slides[0].clientWidth + gap;  // Учитываем промежуток в ширине слайда
    const animationInterval = 10;  // Интервал в миллисекундах между шагами анимации
    const animationDuration = 500;  // Длительность анимации в миллисекундах

    // Клонирование первого и последнего слайда
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);

    // Добавляем клонированные слайды
    track.appendChild(firstSlideClone);
    track.insertBefore(lastSlideClone, slides[0]);

    const allSlides = Array.from(document.querySelectorAll('.slide'));
    track.style.left = `-${slideWidth}px`;  // Начинаем со второго слайда (клон первого реального)

    // Создаем точки навигации
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!isAnimating && currentSlide !== index + 1) {
                moveToSlide(index + 1);
            }
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide - 1].classList.add('active');
    }

    function moveToSlide(targetIndex) {
        if (isAnimating) return;  // Блокировка новых кликов во время анимации
        isAnimating = true;

        const startPos = parseFloat(track.style.left) || 0;
        const endPos = -targetIndex * slideWidth;
        const distance = endPos - startPos;
        const step = distance / (animationDuration / animationInterval);
        let currentPos = startPos;

        const intervalId = setInterval(() => {
            currentPos += step;
            track.style.left = `${currentPos}px`;

            if ((step < 0 && currentPos <= endPos) || (step > 0 && currentPos >= endPos)) {
                clearInterval(intervalId);
                finalizeSlide(targetIndex);
            }
        }, animationInterval);
    }

    function finalizeSlide(targetIndex) {
        currentSlide = targetIndex;

        if (currentSlide === 0) {
            // Если мы на клонированном последнем слайде, перемещаемся на реальный последний
            track.style.left = `-${(allSlides.length - 2) * slideWidth}px`;
            currentSlide = allSlides.length - 2;
        } else if (currentSlide === allSlides.length - 1) {
            // Если мы на клонированном первом слайде, перемещаемся на реальный первый
            track.style.left = `-${slideWidth}px`;
            currentSlide = 1;
        }

        updateDots();  // Обновляем точки навигации
        isAnimating = false;  // Разблокировка после завершения анимации
    }

    nextButton.addEventListener('click', function() {
        if (!isAnimating) {
            moveToSlide(currentSlide + 1);
        }
    });

    prevButton.addEventListener('click', function() {
        if (!isAnimating) {
            moveToSlide(currentSlide - 1);
        }
    });

    // Инициализация
    finalizeSlide(1);
});

