import React, { useState, useRef } from "react";
import { Search } from "lucide-react";

const mockResults = (query: string) =>
  ["Product One", "Product Two", "Service One", "Service Two", "Training One"]
    .filter(item => item.toLowerCase().includes(query.toLowerCase()));

const LiveSearchBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setLoading(true);
    setTimeout(() => {
      setResults(value ? mockResults(value) : []);
      setLoading(false);
    }, 400); // Simulate AJAX delay
  };

  const handleResultClick = (result: string) => {
    setQuery(result);
    setOpen(false);
    setResults([]);
    // You can navigate or handle the result here
  };

  return (
    <div style={{ position: "relative", marginLeft: 16 }}>
      {!open && (
        <button
          aria-label="Search"
          onClick={handleIconClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search />
        </button>
      )}
      {open && (
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              minWidth: 180,
              fontSize: 16,
            }}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
          {loading && (
            <div style={{ position: "absolute", right: 8, top: 8, fontSize: 12, color: "#aaa" }}>
              Loading...
            </div>
          )}
          {results.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                margin: 0,
                padding: 0,
                listStyle: "none",
                zIndex: 100,
                color: "#222"
              }}
            >
              {results.map(result => (
                <li
                  key={result}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                  onMouseDown={() => handleResultClick(result)}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveSearchBar;
