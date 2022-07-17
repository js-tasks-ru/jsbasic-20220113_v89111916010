function makeFriendsList(friends) {
	let ulBlock = document.createElement("ul");

	for (let i = 0; i < friends.length; i++) {

		let liBlock = document.createElement('li');
		let firstName = friends[i].firstName;
		let lastName = friends[i].lastName;
		let elem = firstName + ' ' + lastName;

		// liBlock.innerHTML = elem;
		liBlock.append(elem);
		// liBlock.insertAdjacentHTML('beforeend', elem);

		ulBlock.append(liBlock);
	}

	return ulBlock;
}
