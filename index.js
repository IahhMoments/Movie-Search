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

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7d63908",
      i: movie.imdbID,
    },
  });

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

createAutoComplete({
  root: document.querySelector(".autocomplete"),

  //content of how the movies are going to be rendered (REFACTORED)
  renderOption(movie) {
    return `
    <img src="${movie.Poster}" onerror="this.src=''" />
    ${movie.Title}
    `;
  },
});

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
