function initCarousel() {
	const carouselBodies = document.querySelectorAll('.carousel');

	console.log(document.documentElement.clientWidth);
	carouselBodies.forEach(carouselBody => {
		const carouselInner = carouselBody.querySelector('.carousel__inner');
		const slides = carouselBody.querySelectorAll('.carousel__slide');
		const carouselArrLeft = '.carousel__arrow_left';
		const carouselArrRight = '.carousel__arrow_right';
		const btnLeft = carouselBody.querySelector('.carousel__arrow_left');
		const btnRight = carouselBody.querySelector('.carousel__arrow_right');

		let i = 0;
		console.log('start:', i);
		console.log('start:', carouselInner.style.transform, 'px');
		console.log(slides.length);

		// * переключение отображения кнопок при достижении начала и конца слайдера при загрузке страницы
		if (i == 0) {
			btnLeft.style.display = 'none';
		}

		// * управление слайдером через кнопки навигации
		carouselBody.addEventListener('click', function (e) {
			const carouselWidthSlide = carouselBody.offsetWidth;
			const target = e.target;
			console.log('click:', i);

			if (target.closest(carouselArrLeft) && i < 0) {
				i += 1;
				console.log('left before:', i);
				carouselInner.style.transform = `translateX(${carouselWidthSlide * i}px)`;
				console.log('left:', carouselInner.style.transform, 'px');
				console.log('left after', i);
			}

			if (target.closest(carouselArrRight) && i > -slides.length + 1) {
				i -= 1;
				console.log('right before:', i);
				carouselInner.style.transform = `translateX(${carouselWidthSlide * i}px)`;
				console.log('right:', carouselInner.style.transform, 'px');
				console.log('right after:', i);
			}


			// * переключение отображения кнопок при достижении начала и конца слайдера
			if (i == 0) {
				btnLeft.style.display = 'none';
			} else if (i == -slides.length + 1) {
				btnRight.style.display = 'none';
			} else {
				btnLeft.style.display = '';
				btnRight.style.display = '';
			}
		})
	});
}