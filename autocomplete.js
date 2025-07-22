const createAutoComplete = ({ root }) => {
  root.innerHTML = `
  <label for="movieSearchInput"><b>Search For a Movie</b></label>
  <input id="movieSearchInput" class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    //allows user to view results of other movies for different titles
    resultsWrapper.innerHTML = ``;

    //when user types in input, it adds the class 'is-active'
    dropdown.classList.add("is-active");
    for (let movie of movies) {
      const selection = document.createElement("a");

      //content of how the movies are going to be rendered
      selection.classList.add("dropdown-item");
      selection.innerHTML = `
    <img src="${movie.Poster}" onerror="this.src=''" />
    ${movie.Title}
    `;

      //if user selects a movie the dropdown will close and the input search will show the title of the movie selected
      selection.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = movie.Title;
        onMovieSelect(movie);
      });

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
};
