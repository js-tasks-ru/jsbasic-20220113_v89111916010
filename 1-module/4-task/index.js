function checkSpam(str) {
  if (~str.toLowerCase().indexOf('xxx') || ~str.toLowerCase().indexOf('1xbet')) return true;

  // or
  // if (str.toLowerCase().includes('xxx') || str.toLowerCase().includes('1xbet')) return true;

  else return false;
}
