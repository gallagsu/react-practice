import { fetchStories, fetchStoryById } from './api/api';
import { useState, useEffect } from 'react';

const HackerNewsTop10 = () => {

  const [stories, setStories] = useState(null);
  const [error, setError]   = useState('');

  useEffect(() => {
      async function load() {
        try {
          const ids = await fetchStories();
          const top10 = ids.slice(0, 10);

          const promises = top10.map(id => fetchStoryById(id));
          const results  = await Promise.all(promises);
          setStories(results);
        } catch (err) {
          setError(err)
        }
      }
      load();
    }, []);


  if (error) {
    return <div>Failed to load Hacker News Top 10 Stories</div>
  }
  if (stories === null) {
    return <div>Loading Hacker News Top 10 Stories…</div>
  }

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          <a href={story.url} target="_blank" rel="noopener">
            {story.title}
          </a>
          <div>
            {story.score} points by {story.by}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HackerNewsTop10;