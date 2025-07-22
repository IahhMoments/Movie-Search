const autoCompleteConfig = {
  //content of how the movies are going to be rendered (REFACTORED)
  renderOption(movie) {
    return `
    <img src="${movie.Poster}" onerror="this.src=''" />
    ${movie.Title}
    `;
  },

  inputValue(movie) {
    return movie.Title;
  },

  async fetchData(searchTerm) {
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
  },
};

//left side widget
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"));
  },
});

//right side widget
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"));
  },
});

const onMovieSelect = async (movie, summaryElement) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7d63908",
      i: movie.imdbID,
    },
  });

  summaryElement.innerHTML = movieTemplate(response.data);
};

//render SELECTED movie details
const movieTemplate = (moveiDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${moveiDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${moveiDetail.Title}</h1>
          <h4>${moveiDetail.Genre}</h4>
          <p>${moveiDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${moveiDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${moveiDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${moveiDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${moveiDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${moveiDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
