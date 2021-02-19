window.addEventListener('DOMContentLoaded', () => {
	const videoElement = document.querySelector('#cam-stream');
	let barcodeDetector = null;

	if(!('BarcodeDetector' in window)) {
		displayError('BarcodeDetector api is not supported on this browser.');
	} else {
		barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
	}
	
	(async function() {
		let media = null;
		
		try {
		    media = await navigator.mediaDevices.getUserMedia({audio: false, video: { facingMode: 'environment' } });
		}
		catch(e) {
			displayError(e);
		}
	
		videoElement.srcObject = media;
		videoElement.play();
	
		document.querySelector('#scan-button').addEventListener('click', () => {
			barcodeDetector.detect(videoElement).then(datas => {
				 const url = datas[0].rawValue;
				 displayPopup(url);
			}).catch(displayError);
		})

		displayPopup('#');
	})();


	function displayError(message) {
		const errorPopup = document.querySelector('.popup#error');
		const cover = document.querySelector('#cover');

		errorPopup.querySelector('code p').textContent = message;
		errorPopup.parentNode.classList.remove('hidden');
		cover.classList.remove('hidden');

		let clickedPopup = false;

		errorPopup.addEventListener('click', () => {
			clickedPopup = true;
		});

		errorPopup.parentNode.addEventListener('click', () => {
			if(clickedPopup) clickedPopup = false;
			else dismissError();
		});
	}

	function displayPopup(url) {
		const popup = document.querySelector('.popup#message');
		const cover = document.querySelector('#cover');

		popup.querySelector('code p').textContent = url;
		popup.parentNode.classList.remove('hidden');
		cover.classList.remove('hidden');

		const copyButton = popup.querySelector('#copy');
		const openButton = popup.querySelector('#open');

		openButton.addEventListener('click', () => {
			window.location = url;
		});

		copyButton.addEventListener('click', () => {
			navigator.clipboard.writeText(url);
		});

		let clickedPopup = false;

		popup.addEventListener('click', () => {
			clickedPopup = true;
		});

		popup.parentNode.addEventListener('click', () => {
			if(clickedPopup) clickedPopup = false;
			else dismissPopup();
		});
	}

	function dismissError() {
		const errorPopup = document.querySelector('.popup#error');
		const cover = document.querySelector('#cover');
		errorPopup.parentNode.classList.add('hidden');
		cover.classList.add('hidden');
	}

	function dismissPopup() {
		const popup = document.querySelector('.popup#message');
		const cover = document.querySelector('#cover');
		popup.classList.add('hidden');
		cover.classList.add('hidden');
	}
});

/*
function getCurrentImage(video) {
	const canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

	
}*/