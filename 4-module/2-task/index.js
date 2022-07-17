function makeDiagonalRed(table) {
  let collection = table.rows;

  for (let i = 0; i < collection.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
