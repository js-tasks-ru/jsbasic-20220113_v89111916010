function camelize(str) {
	const array = str.split('-');

	let newValueArr = array.map(function (word, index) {
		if (index == 0) {
			return word;
		} else {
			return word[0].toUpperCase() + word.slice(1);
		}
	})

	let newValueStr = newValueArr.join('');
	return newValueStr;
}

camelize('background-color') == 'backgroundColor';
camelize('list-style-image') == 'listStyleImage';
camelize('-webkit-transition') == 'WebkitTransition';