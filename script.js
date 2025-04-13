document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
  
    // Save the search query to the backend
    await fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keyword: query })
    });
  
    // Fetch recommendations based on the search query
    const response = await fetch(`/recommendations?query=${encodeURIComponent(query)}`);
    const movies = await response.json();
  
    // Display the recommendations
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
  
      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      poster.alt = movie.title;
  
      const title = document.createElement('h3');
      title.textContent = movie.title;
  
      const rating = document.createElement('p');
      rating.textContent = `Rating: ${movie.vote_average}`;
  
      movieCard.appendChild(poster);
      movieCard.appendChild(title);
      movieCard.appendChild(rating);
  
      movieGrid.appendChild(movieCard);
    });
  });
  