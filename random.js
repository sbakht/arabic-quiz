function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandom({count = 1, duplicates = false, min, max}) {
  const result = [];
  while(count > 0) {
    const random = getRandomIntInclusive(min, max);
    if(!duplicates && result.length >= (max-min) + 1) {
      throw new Error(`Cannot make more random numbers ${result}`);
      break;
    }
    if(duplicates || result.indexOf(random) === -1) {
      result.push(random);
      count--;
    }
  }
  return result;
}