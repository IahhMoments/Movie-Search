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
  <label><b>Search For a Movie</b></label>
  <input class="input" />
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

  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const selection = document.createElement("a");

    //content of how the movies are going to be rendered
    selection.classList.add("dropdown-item");
    selection.innerHTML = `
    <img src="${movie.Poster}" />
    ${movie.Title}
    `;

    //render movies by selecting div with ID of 'target' and appending div variable as a child
    resultsWrapper.appendChild(selection);
  }
};

input.addEventListener("input", debounce(onInput, 500));
