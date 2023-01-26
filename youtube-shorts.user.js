// ==UserScript==
// @name         Youtube - hide shorts
// @namespace    http://qmegas.info/youtube-shorts
// @version      0.2
// @description  Hides shorts videos from subscription page
// @match        https://www.youtube.com/*
// @author       Megas (qmegas.info)
// ==/UserScript==

const cleanShorts = () => {
	[...document.querySelectorAll('ytd-grid-video-renderer')].forEach(e => {
		if (e.querySelector('ytd-thumbnail-overlay-time-status-renderer')?.getAttribute('overlay-style') === 'SHORTS') {
			e.remove();
		}
	});
};

const checkUrl = () => {
	if (document.location.pathname === '/feed/subscriptions') {
		if (document.querySelector('ytd-section-list-renderer[page-subtype=subscriptions]') === null) {
			setTimeout(checkUrl, 100);
		} else {
			cleanShorts();
		}
	}
};

const initEventHandlers = () => {
	let currentUrl = document.location.pathname;

	setInterval(() => {
		if (currentUrl !== document.location.pathname) {
			currentUrl = document.location.pathname;
			checkUrl();
		}
	}, 100);
};

const init = () => {
	initEventHandlers();
	checkUrl();
};

init();
