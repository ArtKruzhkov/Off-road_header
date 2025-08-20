import { gsap, Power2 } from 'gsap';
import MicroModal from 'micromodal';

document.addEventListener('DOMContentLoaded', () => {

	// Modal

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
		onClose: () => {
			document.activeElement.blur();
		}
	})


	// Swiper

	const swiperImg = new Swiper('.slider-img', {
		parallax: true,
		speed: 2500,
		loop: false,
		mousewheel: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				let totalRes = total >= 10 ? total : `0${total}`;
				return totalRes;
			}
		}
	});
	const swiperText = new Swiper('.slider-text', {
		loop: false,
		speed: 2500,
		mousewheel: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true
		},
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next'
		}
	});

	swiperText.controller.control = swiperImg;
	swiperImg.controller.control = swiperText;

	// Gear

	const sliderGear = document.querySelector('.slider-gear');

	swiperText.on('slideNextTransitionStart', function () {
		gsap.to(sliderGear, {
			duration: 2.8,
			rotation: '+=45',
			ease: Power2.easeOut
		});
	});

	swiperText.on('slidePrevTransitionStart', function () {
		gsap.to(sliderGear, {
			duration: 2.8,
			rotation: '-=45',
			ease: Power2.easeOut
		});
	});

	// Slide Change

	const currentNum = document.querySelector('.slider-pagination-count .current');
	const currentNumBottom = document.querySelector('.slider-pagination-current__num');

	swiperText.on('slideChange', function () {
		let index = swiperText.realIndex + 1,
			indexRes = index >= 10 ? index : `0${index}`;

		gsap.to(currentNum, {
			duration: 0.2,
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function () {
				gsap.to(currentNum, {
					duration: 0.1,
					force3D: true,
					y: 10
				})
				currentNum.innerHTML = indexRes
				currentNumBottom.innerHTML = indexRes
			}
		})
		gsap.to(currentNum, {
			duration: 0.2,
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: 0.3
		})
	})

	// Cursor

	const body = document.querySelector('body');
	const cursor = document.getElementById('cursor');
	const links = document.getElementsByTagName('a');

	let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

	function mouseCoordinates(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	}

	gsap.to({}, {
		duration: 0.01,
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 7;
			posY += (mouseY - posY) / 7;
			gsap.set(cursor, {
				css: {
					left: posX,
					top: posY
				}
			})
		}
	})

	for (let index = 0; index < links.length; index++) {
		links[index].addEventListener('mouseover', () => {
			cursor.classList.add('active');
		})
		links[index].addEventListener('mouseout', () => {
			cursor.classList.remove('active');
		})
	}

	body.addEventListener('mousemove', event => {
		mouseCoordinates(event);
		cursor.classList.remove('hidden');
	})

	body.addEventListener('mouseout', event => {
		cursor.classList.add('hidden');
	})

});