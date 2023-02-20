function resizeIframe(iFrame) {
	iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}
window.addEventListener('DOMContentLoaded', function (e) {
	let iFrame = document.getElementById('iframe-1');
	resizeIframe(iFrame);
});
