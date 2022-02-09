function camelize(str) {
	const array = str.split('-');

	let newValueStr = array.map(function (word, index) {
		if (index == 0) {
			return word;
		} else {
			return word[0].toUpperCase() + word.slice(1);
		}
	})

	let newValueArr = newValueStr.join('');
	return newValueArr;
}

camelize('background-color') == 'backgroundColor';
camelize('list-style-image') == 'listStyleImage';
camelize('-webkit-transition') == 'WebkitTransition';