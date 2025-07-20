const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7d63908",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label for="movieSearchInput"><b>Search For a Movie</b></label>
  <input id="movieSearchInput" class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  //allows user to view results of other movies for different titles
  resultsWrapper.innerHTML = ``;

  //when user types in input, it adds the class 'is-active'
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const selection = document.createElement("a");

    //content of how the movies are going to be rendered
    selection.classList.add("dropdown-item");
    selection.innerHTML = `
    <img src="${movie.Poster}" onerror="this.src="" " />
    ${movie.Title}
    `;

    //render movies by selecting div with ID of 'target' and appending div variable as a child
    resultsWrapper.appendChild(selection);
  }
};

input.addEventListener("input", debounce(onInput, 500));

//if user clicks outside of dropdown menu it will close
document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});
