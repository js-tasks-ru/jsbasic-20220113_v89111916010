function showSalary(users, age) {
	const usersAfterFilterAge = users.filter(item => (item.age <= age));

	const listOnlyNameAndSalary = usersAfterFilterAge.map(item => {
		return item.name + ', ' + item.balance;
	});
	return listOnlyNameAndSalary.join('\n');
}
