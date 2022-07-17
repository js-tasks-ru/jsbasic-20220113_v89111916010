function highlight(table) {
	const rows = table.rows;

	for (let i = 0; i < rows.length; i++) {

		if (!rows[i].closest('thead')) {
			let cells = rows[i].cells;
			console.log('rows');
			console.log('================');
			for (let j = 0; j < cells.length; j++) {
				let cell = cells[j];
				// console.log('cell');
				if (cell.hasAttribute('data-available')) {
					let attrValue = cell.getAttribute('data-available');

					if (attrValue == 'true') {
						rows[i].classList.add('available');

					} else if (attrValue == 'false') {
						rows[i].classList.add('unavailable');
					}

				} else if (!rows[i].querySelector('[data-available]') & !rows[i].hasAttribute('hidden')) {
					console.log('hidden');
					rows[i].setAttribute('hidden', '');
				}
			}
			if (rows[i].cells[2].innerHTML == 'm') {
				rows[i].classList.add('male')

			} else if (rows[i].cells[2].innerHTML == 'f') {
				rows[i].classList.add('female')

			}
			if (rows[i].cells[1].innerHTML < 18) {
				rows[i].style.textDecoration = 'line-through';
			}
		}
	}
}
