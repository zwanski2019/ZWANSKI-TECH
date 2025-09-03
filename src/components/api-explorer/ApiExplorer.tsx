import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ApiList from "./ApiList";
import { ApiEntry } from "./ApiCard";

const ApiExplorer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [auth, setAuth] = useState("");
  const [httpsOnly, setHttpsOnly] = useState(false);
  const [apis, setApis] = useState<ApiEntry[]>([]);
  const [featured, setFeatured] = useState<ApiEntry[]>([]);

  const categories = useMemo(
    () => Array.from(new Set(apis.map((a) => a.Category))).sort(),
    [apis]
  );

  useEffect(() => {
    fetch("/apis/data/all-apis.json")
      .then((res) => res.json())
      .then((data: ApiEntry[]) => setApis(data))
      .catch(() => setApis([]));
    fetch("/apis/data/featured-apis.json")
      .then((res) => res.json())
      .then((data: ApiEntry[]) => setFeatured(data))
      .catch(() => setFeatured([]));
  }, []);

  const filtered = useMemo(() => {
    return apis.filter((entry) => {
      if (httpsOnly && !entry.HTTPS) return false;
      if (category && entry.Category !== category) return false;
      if (auth === "none") {
        if (entry.Auth) return false;
      } else if (auth) {
        if (entry.Auth.toLowerCase() !== auth.toLowerCase()) return false;
      }
      const search = query.toLowerCase();
      return (
        entry.API.toLowerCase().includes(search) ||
        entry.Description.toLowerCase().includes(search)
      );
    });
  }, [apis, query, category, auth, httpsOnly]);

  return (
    <div className="overflow-safe space-y-6 w-full max-w-full">
      <div className="sticky top-0 bg-background z-10 py-4 space-y-4">
        <SearchBar query={query} onChange={setQuery} />
        <FilterPanel
          categories={categories}
          category={category}
          setCategory={setCategory}
          auth={auth}
          setAuth={setAuth}
          httpsOnly={httpsOnly}
          setHttpsOnly={setHttpsOnly}
        />
      </div>

      <div>
        {featured.length > 0 && (
          <div className="mb-8 space-y-2">
            <h2 className="text-xl font-semibold">Featured APIs</h2>
            <ApiList entries={featured} />
          </div>
        )}
        <ApiList entries={filtered} />
      </div>
    </div>
  );
};

export default ApiExplorer;
