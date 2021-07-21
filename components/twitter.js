import Twitter from 'twitter-v2';

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.API_TOKEN,
  access_token_secret: process.env.API_TOKEN_SECRET,
});

const { data } = await client.get('tweets', { ids: '1417700904237551616' });
console.log(data);
export default data;