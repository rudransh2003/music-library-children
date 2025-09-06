import React, { useMemo, useState } from "react";
import { verifyToken } from "./utils";

const initialSongs = [
  { id: 1, title: "Sunrise", artist: "Luna", album: "Morning Light", duration: "3:20" },
  { id: 2, title: "Midnight Drive", artist: "Comet", album: "Night Tales", duration: "4:12" },
  { id: 3, title: "Ocean Eyes", artist: "Luna", album: "Sea Songs", duration: "3:55" },
  { id: 4, title: "City Lights", artist: "Comet", album: "Night Tales", duration: "3:44" },
  { id: 5, title: "Whispers", artist: "Aurora", album: "Morning Light", duration: "2:58" }
];

export default function MusicLibrary({ token }) {
  const user = verifyToken(token);
  const role = user?.role || "user";

  const [songs, setSongs] = useState(initialSongs);
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all"); // album | artist | title | all
  const [sortBy, setSortBy] = useState("title"); // title | artist | album
  const [groupBy, setGroupBy] = useState("none"); // album | artist | none

  // Filter using JavaScript .filter()
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return songs.filter(song => {
      if (!q) return true;
      if (filterBy === "all") {
        return [song.title, song.artist, song.album].some(s => s.toLowerCase().includes(q));
      }
      return song[filterBy].toLowerCase().includes(q);
    });
  }, [songs, query, filterBy]);

  // Sort using .sort() on a mapped copy
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const A = a[sortBy].toLowerCase();
      const B = b[sortBy].toLowerCase();
      return A < B ? -1 : A > B ? 1 : 0;
    });
  }, [filtered, sortBy]);

  // Group using .reduce()
  const grouped = useMemo(() => {
    if (groupBy === "none") return null;
    return sorted.reduce((acc, song) => {
      const key = song[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(song);
      return acc;
    }, {});
  }, [sorted, groupBy]);

  // Add song (admin only)
  function addSong(e) {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const artist = form.artist.value.trim();
    const album = form.album.value.trim();
    if (!title || !artist) return alert("Title & artist required");
    setSongs(prev => [...prev, {
      id: prev.length ? Math.max(...prev.map(s => s.id)) + 1 : 1,
      title, artist, album: album || "Unknown", duration: "3:00"
    }]);
    form.reset();
  }

  // Delete (admin only)
  function deleteSong(id) {
    setSongs(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Music Library</h2>
        <div className="text-sm opacity-80">Role: <strong>{role}</strong></div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <input className="border p-2 rounded" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={filterBy} onChange={e => setFilterBy(e.target.value)} className="border p-2 rounded">
          <option value="all">Filter: All</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <div className="flex gap-2">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border p-2 rounded">
            <option value="title">Sort: Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
          <select value={groupBy} onChange={e => setGroupBy(e.target.value)} className="border p-2 rounded">
            <option value="none">Group: None</option>
            <option value="album">Group by Album</option>
            <option value="artist">Group by Artist</option>
          </select>
        </div>
      </div>

      {/* admin add form */}
      {role === "admin" && (
        <form onSubmit={addSong} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          <input name="title" placeholder="Title" className="border p-2 rounded" />
          <input name="artist" placeholder="Artist" className="border p-2 rounded" />
          <input name="album" placeholder="Album" className="border p-2 rounded" />
          <button className="bg-blue-600 text-white px-3 py-2 rounded">Add Song</button>
        </form>
      )}

      {/* songs list */}
      <div>
        {groupBy === "none" ? (
          <ul className="space-y-2">
            {sorted.map(song => (
              <li key={song.id} className="p-2 border rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{song.title}</div>
                  <div className="text-sm opacity-70">{song.artist} — {song.album}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm opacity-70">{song.duration}</div>
                  {role === "admin" && (
                    <button className="text-red-600" onClick={() => deleteSong(song.id)}>Delete</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // grouped view using Object.entries
          Object.entries(grouped).map(([key, list]) => (
            <div key={key} className="mb-4">
              <h3 className="font-semibold mb-2">{key} <span className="text-sm opacity-70">({list.length})</span></h3>
              <ul className="space-y-2">
                {list.map(song => (
                  <li key={song.id} className="p-2 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{song.title}</div>
                      <div className="text-sm opacity-70">{song.artist}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm opacity-70">{song.duration}</div>
                      {role === "admin" && (
                        <button className="text-red-600" onClick={() => deleteSong(song.id)}>Delete</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}