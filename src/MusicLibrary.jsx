import React, { useEffect, useMemo, useRef, useState } from "react";
import { verifyToken } from "./utils";
import "./index.css";
import SongCard from "./components/SongCard";
import EmptyState from "./components/EmptyState";
import SideNav from "./components/SideNav";
import AddSongForm from "./components/AddSongForm";

const STORAGE_KEY = "music_library_songs";
const loadSongs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const saveSongs = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
const uid = () => Date.now() + Math.random().toString(16).slice(2);

export default function MusicLibrary({ token, logout }) {
  const user = verifyToken(token);
  const role = user?.role || "user";
  const isAdmin = role === "admin";

  const [songs, setSongs] = useState([]);
  useEffect(() => setSongs(loadSongs()), []);
  useEffect(() => saveSongs(songs), [songs]);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return songs;
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query) ||
        (s.album || "").toLowerCase().includes(query)
    );
  }, [songs, q]);

  const pageSize = 18;
  const [page, setPage] = useState(1);
  const rowRef = useRef(null);
  useEffect(() => setPage(1), [q, songs]);

  // Track scroll button visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const onScroll = () => {
      updateScrollButtons();

      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 240;
      const moreAvailable = page * pageSize < filtered.length;
      if (nearEnd && moreAvailable) setPage((p) => p + 1);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    updateScrollButtons(); // run once initially
    return () => el.removeEventListener("scroll", onScroll);
  }, [filtered.length, page]);

  const visible = filtered.slice(0, page * pageSize);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    cover: "",
  });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const addSong = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const artist = form.artist.trim();
    if (!title || !artist) return alert("Title and Artist are required");
    const next = {
      id: uid(),
      title,
      artist,
      album: form.album.trim() || "Single",
      duration: form.duration.trim() || "3:00",
      cover: form.cover.trim() || "",
      createdAt: Date.now(),
    };
    setSongs((prev) => [next, ...prev]);
    setForm({ title: "", artist: "", album: "", duration: "", cover: "" });
    setOpen(false);
  };

  const deleteSong = (id) => setSongs((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <header className="sticky top-0 z-30 bg-[#0f0f0f]/85  border-b border-white/10">
        <div className="pl-64 pr-6 h-14 flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full max-w-2xl">
              <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                <span>🔎</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search songs, artists, albums"
                  className="bg-transparent outline-none w-full text-sm placeholder-white/60"
                />
              </div>
            </div>
          </div>

          {isAdmin && (
            <button
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:opacity-90"
              onClick={() => setOpen(true)}
            >
              Add song
            </button>
          )}
          <button
            className="ml-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <SideNav />

      <main className="pl-64">
        <section className="px-6 pt-6 pb-2">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Songs for you</h2>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              ref={rowRef}
              className="hscroll overflow-x-auto overflow-y-hidden pr-6"
            >
              <div className="flex gap-4">
                {visible.length === 0 ? (
                  <EmptyState isAdmin={isAdmin} openModal={() => setOpen(true)} />
                ) : (
                  visible.map((s) => (
                    <SongCard
                      key={s.id}
                      song={s}
                      canDelete={isAdmin}
                      onDelete={() => deleteSong(s.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Left button */}
            {canScrollLeft && (
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => {
                  rowRef.current?.scrollBy({ left: -600, behavior: "smooth" });
                  updateScrollButtons();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10"
              >
                ‹
              </button>
            )}

            {/* Right button */}
            {canScrollRight && (
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => {
                  const el = rowRef.current;
                  el?.scrollBy({ left: 600, behavior: "smooth" });
                  updateScrollButtons();
                  const moreAvailable = page * pageSize < filtered.length;
                  if (el && moreAvailable) {
                    const nearEnd =
                      el.scrollLeft + el.clientWidth >= el.scrollWidth - 840;
                    if (nearEnd) setPage((p) => p + 1);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10"
              >
                ›
              </button>
            )}
          </div>
          {visible.length < filtered.length && (
            <div className="text-center text-white/50 text-xs mt-3">
              Scroll or tap › to load more
            </div>
          )}
        </section>
      </main>

      {isAdmin && open && (
        <AddSongForm
          open={open}
          onClose={() => setOpen(false)}
          form={form}
          onChange={onChange}
          onSubmit={addSong}
        />
      )}
    </div>
  );
}