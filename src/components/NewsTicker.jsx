import { useEffect, useState } from "react";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`;

export default function NewsTicker() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data?.articles) {
        setArticles(
          data.articles.map((a) => ({
            title: a.title,
            url: a.url,
            source: a.source?.name,
          }))
        );
        setError(false);
      } else {
        throw new Error("Invalid response");
      }
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchNews();
    const id = setInterval(fetchNews, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-primary text-primary-foreground h-8 sm:h-9">
        <div className="ticker-animation whitespace-nowrap px-4 font-medium">
          🇵🇸 Free Palestine & 🇺🇦 Free Ukraine
        </div>
      </div>
      <div
        className="bg-muted/50 text-foreground h-10 sm:h-11 flex items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {error ? (
          <span className="px-4">Unable to load news</span>
        ) : (
          <div className={`flex gap-8 px-4 ticker-animation ${paused ? "ticker-paused" : ""}`}>
            {articles.concat(articles).map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap hover:underline"
              >
                {a.title}{" "}
                <span className="text-muted-foreground">({a.source})</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
