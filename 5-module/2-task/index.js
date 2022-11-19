function toggleText() {
	const elements = document.querySelectorAll('.toggle-text-button');

	for (elem of elements) {
		elem.addEventListener('click', function (e) {
			text.toggleAttribute('hidden');
		});
	}
}
