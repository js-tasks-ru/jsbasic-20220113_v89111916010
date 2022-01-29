function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  } else {
    let newStr;
    newStr = str.substr(0, maxlength - 1) + "…";
    return newStr;
  }
}

truncate();