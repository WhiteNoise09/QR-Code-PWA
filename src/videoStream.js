window.addEventListener('DOMContentLoaded', () => {
	const videoElement = document.querySelector('#cam-stream');
	let barcodeDetector = null;

	if(!('BarcodeDetector' in window)) {
		alert('BarcodeDetector api is not supported on this browser.')
	} else {
		barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
		log('initalised barcode');
	}
	
	(async function() {
		let media = null;
		
		try {
		    media = await navigator.mediaDevices.getUserMedia({audio: false, video: { facingMode: 'environment' } });
		}
		catch(e) {
			document.querySelector('body').textContent = e;
		}
	
		videoElement.srcObject = media;
		videoElement.play();
	
		document.querySelector('#scan-button').addEventListener('click', () => {
			log('click !')
			alert('hey');
			barcodeDetector.detect(videoElement).then(datas => {
				log('hey2 !');
				alert(datas.rawValue);
			}).catch(() => log('hey 3 !'));
		})
	})();

	function log(message) {
		document.querySelector('#log').textContent = message;
	}
});

/*
function getCurrentImage(video) {
	const canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

	
}*/