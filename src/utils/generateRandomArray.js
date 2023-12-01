const generateRandomnArray = (count, max) => {
  const randomNums = [];
  while(randomNums.length < count) {
    const randomNum = Math.floor(Math.random() * max);
    // if randomNum is not present in array => push number to array
    if (randomNums.indexOf(randomNum) === -1) {
      randomNums.push(randomNum);
    }
  }
  return randomNums;
};

export default generateRandomnArray;