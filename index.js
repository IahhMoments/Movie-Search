const fetchData = async () => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "7d63908",
      s: "avengers",
    },
  });

  console.log(response.data);
};

fetchData();
