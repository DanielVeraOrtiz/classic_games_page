import axios from 'axios';
import FALLBACK_GAMES from './gamesDataFallback.json';

export const getGames = async () => {
  try {
    const response = await axios.get('https://gamemonetize.com/feed.php?format=0&num=50&page=1');
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    console.warn('Using fallback data');
    return FALLBACK_GAMES;
  }
};
