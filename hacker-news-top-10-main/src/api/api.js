import axios from 'axios';

const API_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/';

export const fetchStories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchStoryById = async (id) => {
    const response = await axios.get(`${STORY_URL}${id}.json`);
    return response.data;
};