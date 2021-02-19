const videoElement = document.querySelector('#cam-stream');

if(!('BarcodeDetector' in window)) {
	alert('BarcodeDetector api is not supported on this browser.')
} else {
	var barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
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
		BarcodeDetector.detect(videoElement).then(datas => {
			window.location = datas.rawValue;
		});
	})
})();

/*
function getCurrentImage(video) {
	const canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

	
}*/