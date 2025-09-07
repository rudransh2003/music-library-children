import React, { useEffect, useMemo, useRef, useState } from "react";
import { verifyToken } from "./utils";
import "./index.css";
import SideNav from "./components/SideNav";
import AddSongForm from "./components/AddSongForm";
import Header from "./components/Header";
import SongsForYouSection from "./components/SongsForYouSection";
import AlbumSection from "./components/AlbumSection";
import CreateAlbumForm from "./components/CreateAlbumForm";
import ShowActiveAlbum from "./components/ShowActiveAlbum";
import AddSongInAlbum from "./components/AddSongInAlbum";

const SONGS_KEY = "music_library_songs";
const ALBUMS_KEY = "music_library_albums";

const load = (k, fallback) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const uid = () => Date.now() + Math.random().toString(16).slice(2);

export default function MusicLibrary({ token, logout }) {
  const user = verifyToken(token);
  const role = user?.role || "user";
  const isAdmin = role === "admin";

  /* ---------------- SONGS ---------------- */
  const [songs, setSongs] = useState([]);
  useEffect(() => setSongs(load(SONGS_KEY, [])), []);
  useEffect(() => save(SONGS_KEY, songs), [songs]);

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
    updateScrollButtons();
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

  const [albums, setAlbums] = useState([]);
  useEffect(() => setAlbums(load(ALBUMS_KEY, [])), []);
  useEffect(() => save(ALBUMS_KEY, albums), [albums]);

  const [albumForm, setAlbumForm] = useState({
    title: "",
    artist: "",
    planned: "",
    cover: "",
  });
  const [openAlbumForm, setOpenAlbumForm] = useState(false);
  const onAlbumChange = (e) =>
    setAlbumForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const createAlbum = (e) => {
    e.preventDefault();
    if (!albumForm.title.trim()) return alert("Title required");
    const album = {
      id: uid(),
      title: albumForm.title.trim(),
      artist: albumForm.artist.trim(),
      planned: parseInt(albumForm.planned || "0", 10),
      cover: albumForm.cover.trim(),
      songIds: [],
    };
    setAlbums((prev) => [album, ...prev]);
    setAlbumForm({ title: "", artist: "", planned: "", cover: "" });
    setOpenAlbumForm(false);
  };

  const [activeAlbum, setActiveAlbum] = useState(null);
  const [selectSongsOpen, setSelectSongsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState({});
  const toggleSong = (id) =>
    setSelectedIds((m) => ({ ...m, [id]: !m[id] }));
  const saveAlbumSongs = () => {
    const ids = Object.entries(selectedIds)
      .filter(([, v]) => v)
      .map(([id]) => id);
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === activeAlbum.id ? { ...a, songIds: ids } : a
      )
    );
    setSelectSongsOpen(false);
  };
  const songsById = useMemo(
    () => Object.fromEntries(songs.map((s) => [s.id, s])),
    [songs]
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header q={q} setQ ={setQ} setOpen={setOpen} logout={logout} isAdmin={isAdmin} />

      <SideNav />

      <main className="pl-64">
        <SongsForYouSection 
          rowRef = {rowRef}
          visible = {visible}
          isAdmin = {isAdmin}
          setOpen = {setOpen}
          canScrollLeft = {canScrollLeft}
          canScrollRight = {canScrollRight}
          updateScrollButtons = {updateScrollButtons}
          filtered = {filtered}
          deleteSong={deleteSong}
        />

        <AlbumSection 
          isAdmin={isAdmin}
          setOpenAlbumForm={setOpenAlbumForm}
          albums={albums}
          setActiveAlbum={setActiveAlbum}
        />
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

      {isAdmin && openAlbumForm && (
        <CreateAlbumForm 
          createAlbum={createAlbum}
          albumForm={albumForm}
          onAlbumChange={onAlbumChange}
          setOpenAlbumForm={setOpenAlbumForm}
        />
      )}

      {activeAlbum && (
        <ShowActiveAlbum 
          setActiveAlbum={setActiveAlbum}
          activeAlbum={activeAlbum}
          isAdmin={isAdmin}
          setSelectedIds={setSelectedIds}
          setSelectSongsOpen={setSelectSongsOpen}
          songsById={songsById}
        />
      )}

      {isAdmin && selectSongsOpen && activeAlbum && (
        <AddSongInAlbum 
        activeAlbum={activeAlbum}
        songs={songs}
        selectedIds={selectedIds}
        toggleSong={toggleSong}
        setSelectSongsOpen={setSelectSongsOpen}
        saveAlbumSongs={saveAlbumSongs}
        />
      )}
    </div>
  );
}
