const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7d63908",
      s: searchTerm,
    },
  });

  console.log(response.data);
};

let timeOutId;
const input = document.querySelector("input");
const onInput = (event) => {
  //clear Id number for setTimeout
  if (timeOutId) {
    clearTimeout(timeOutId);
  }

  //runs everytime user presses a key in input and calls new Id for setTimeout
  timeOutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 1000);
};

input.addEventListener("input", onInput);
