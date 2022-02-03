function filterRange(arr, a, b) {
	let result = arr.filter(item => a <= item && item <= b)
	return result;
}

