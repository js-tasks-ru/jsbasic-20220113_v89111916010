function sumSalary(salaries) {
  let sumSalary = 0;

  for (let key in salaries) {
    if (isFinite(salaries[key]) && typeof (salaries[key]) === 'number') {
      sumSalary += salaries[key];
    }
  }

  return sumSalary;

}

sumSalary(salaries);