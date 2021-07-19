let objectFitPoly = false;
let loadLazyLoadScript = false;

document.addEventListener('DOMContentLoaded', function(){
	loadFonts();
	supportPolyfills();
	correctVh();
	lazyLoad();
});

// load fonts
function loadFonts() {
	WebFont.load({
		custom: {
			families: ['Font Awesome 5 Brands'],
			urls: ['/css/fonts.css']
		},
		google: {
			families: ['Open+Sans:400,700,regular,italic', 'Playfair Display:400,700,regular']
		}
	});
}

// lazyLoad Images
function lazyLoad() {
	if ('loading' in HTMLImageElement.prototype) {
		var images = document.querySelectorAll('img.lazyload');
		images.forEach(function (img) {
			img.src = img.dataset.src;
			img.onload = function() {
				img.classList.add('lazyloaded');
			};
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
			if (img.classList.contains('lazyload-bg')) {
				img.style.display = "none";
				img.parentNode.style.backgroundImage = "url(" + img.dataset.src + ")";
			}
		});
	} else {
		if (!loadLazyLoadScript) {
			loadLazyLoadScript = true;
			var script = document.createElement("script");
			script.async = true;
			script.src = '/js/lazysizes.min.js';
			document.body.appendChild(script);
		}
		document.addEventListener('lazyloaded', function (e) {
			var img = e.target;
			if (img.classList.contains('lazyload-bg')) {
				img.style.display = 'none';
				img.parentNode.style.backgroundImage = 'url(' + img.dataset.src + ')';
			}
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
		});
	}
}

// replaseInlineSvg
function replaseInlineSvg(el) {
	const imgID = el.getAttribute('id');
	const imgClass = el.getAttribute('class');
	const imgURL = el.getAttribute('src');

	fetch(imgURL)
		.then(data => data.text())
		.then(response => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(response, 'text/html');
			let svg = xmlDoc.querySelector('svg');

			if (typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
			}

			if (typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass + ' replaced-svg');
			}

			svg.removeAttribute('xmlns:a');

			el.parentNode.replaceChild(svg, el);
	});
}

// correctVh
function correctVh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
}

// support and polyfills
function supportPolyfills() {
	// objectFit
	if('objectFit' in document.documentElement.style === false && !objectFitPoly) {
		const script = document.createElement('script');

		script.src = '/js/ofi.min.js';
		document.body.appendChild(script);
		script.onload = function () {
			objectFitPoly = true;
			objectFitImages();
		};
	}

	// forEach
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	// swiper 6 polyfills
	Number.isNaN = Number.isNaN || function isNaN(input) {
		return typeof input === 'number' && input !== input;
	}

	if (!String.prototype.repeat) {
		String.prototype.repeat = function(count) {
			'use strict';
			if (this == null)
				throw new TypeError('can\'t convert ' + this + ' to object');

			var str = '' + this;
			count = +count;
			if (count != count)
				count = 0;

			if (count < 0)
				throw new RangeError('repeat count must be non-negative');

			if (count == Infinity)
				throw new RangeError('repeat count must be less than infinity');

			count = Math.floor(count);
			if (str.length == 0 || count == 0)
				return '';

			if (str.length * count >= 1 << 28)
				throw new RangeError('repeat count must not overflow maximum string size');

			var maxCount = str.length * count;
			count = Math.floor(Math.log(count) / Math.log(2));
			while (count) {
				str += str;
				count--;
			}
			str += str.substring(0, maxCount - str.length);
			return str;
		}
	}
	// swiper 6 polyfills end
};

const faderSpan = document.createElement('span');
	faderSpan.className = 'fader';
	headerMain = document.querySelector('#header');
	headerMain.appendChild(faderSpan);

// mobile menu
function mobileMenu() {
	const openBtn = document.querySelector('.open-menu'),
		fader = document.querySelector('.fader');

	openBtn.addEventListener('click', function(event) {
		event.preventDefault();
		if ( document.body.classList.contains('menu-opened') ) {
			document.body.classList.remove('menu-opened');
		} else {
			document.body.classList.add('menu-opened');
		}
	});
	fader.addEventListener('click', function(){
		document.body.classList.toggle('menu-opened');
	});
};

// Swiper testimonials
const swiper_testimonials = document.querySelector('.swiper-testimonials');
const swiperTestimonials = new Swiper( swiper_testimonials, {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
} );

// Questions tabs
const jsTrigger = document.querySelectorAll('.js-tab-trigger');

jsTrigger.forEach(function(trigger) {
	trigger.addEventListener('click', function() {
		let id = this.getAttribute('data-tab'),
			content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
			activeTrigger = document.querySelector('.js-tab-trigger.active'),
			activeContent = document.querySelector('.js-tab-content.active');

			activeTrigger.classList.remove('active');
			trigger.classList.add('active');
			activeContent.classList.remove('active');
			content.classList.add('active');
	});
});

// Google Map

let map;
function initMap() {
	let mapBlock = document.querySelector('.map-block');
	let mapLat = parseFloat(mapBlock.getAttribute('data-lat'));
	let mapLong = parseFloat(mapBlock.getAttribute('data-long'));
	map = new google.maps.Map(document.querySelector('.map-block'), {
		center: { lat: mapLat, lng: mapLong },
		zoom: 8,
		disableDefaultUI: true,
	});
}
window.addEventListener('load', initMap);
// var bgImageCover = document.querySelectorAll('img.bg-section-img');
// objectFitImages(bgImageCover);

// jQuery
(function($){
	'use strict';
	// scrollTo smooth
	$(".main-nav a").on('click', function(){
		$("html, body").animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
	});

	$(document).ready(function() {
		mobileMenu();
	}); // ready


	$(window).on('resize', function() {
	}); // resize

	$(window).on('load', function() {
	}); // load

	// functions
})(this.jQuery);
