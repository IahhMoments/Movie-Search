//Debounce function limits amount of searches in input
const debounce = (func, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    //clear Id number for setTimeout
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    //runs everytime user presses a key in input and calls new Id for setTimeout
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
