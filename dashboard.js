
async function searchMovie() {
    const keyword = document.getElementById('searchInput').value;
    const token = localStorage.getItem('token');
    const userId = parseJwt(token).userId;
  
    await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword, userId })
    });
  
    // Get updated recommendations
    const res = await fetch(`http://localhost:5000/recommend/${userId}`);
    const data = await res.json();
  
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    data.recommendations.forEach(movie => {
      const div = document.createElement('div');
      div.innerHTML = `<h4>${movie.title}</h4><p>${movie.overview}</p>`;
      container.appendChild(div);
    });
  }
  
  // JWT decoding utility
  function parseJwt(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
  