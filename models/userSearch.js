const mongoose = require('mongoose');

const userSearchSchema = new mongoose.Schema({
  userId: String,
  keyword: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserSearch', userSearchSchema);
const UserSearch = require('./models/userSearch');

app.post('/search', async (req, res) => {
  const { keyword, userId } = req.body;
  await new UserSearch({ userId, keyword }).save();
  res.json({ message: 'Search saved' });
});
app.get('/recommend/:userId', async (req, res) => {
    const { userId } = req.params;
    const searches = await UserSearch.find({ userId });
  
    // Count most searched keywords
    const genreMap = {};
    searches.forEach(search => {
      const keyword = search.keyword.toLowerCase();
      genreMap[keyword] = (genreMap[keyword] || 0) + 1;
    });
  
    const topKeyword = Object.keys(genreMap).sort((a, b) => genreMap[b] - genreMap[a])[0];
  
    // Call TMDB or dummy data
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${topKeyword}`;
    const response = await fetch(tmdbUrl);
    const data = await response.json();
  
    res.json({ recommendations: data.results.slice(0, 5) });
  });
  