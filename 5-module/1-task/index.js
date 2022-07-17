function hideSelf() {
	const elem = document.querySelector('.hide-self-button');

	elem.addEventListener('click', function (e) {
		console.log(elem);
		elem.setAttribute('hidden', '');
	});
}
