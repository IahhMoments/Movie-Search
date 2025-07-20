const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7d63908",
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const debounce = (func) => {
  let timeOutId;
  return (...args) => {
    //clear Id number for setTimeout
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    //runs everytime user presses a key in input and calls new Id for setTimeout
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, 1000);
  };
};

const input = document.querySelector("input");
const onInput = (event) => {
  fetchData(event.target.value);
};

input.addEventListener("input", debounce(onInput));
