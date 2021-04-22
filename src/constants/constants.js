const  API_KEY = '4e60f4f86317e0109fcd5755a9ed812f';
export const getUrl = query => {
    return `https://gnews.io/api/v4/search?q=${query}&token=${API_KEY}`;
}
