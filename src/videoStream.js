window.addEventListener('DOMContentLoaded', () => {
	const videoElement = document.querySelector('#cam-stream');
	let barcodeDetector = null;

	if(!('BarcodeDetector' in window)) {
		return alert('BarcodeDetector api is not supported on this browser.')
	} else {
		barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
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
			barcodeDetector.detect(videoElement).then(datas => {
				window.location = datas[0].rawValue;
			}).catch(alert);
		})
	})();
});

/*
function getCurrentImage(video) {
	const canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

	
}*/