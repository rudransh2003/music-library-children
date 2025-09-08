import React, { useEffect, useMemo, useState } from "react";
import { verifyToken } from "./utils";
import "./index.css";
import SideNav from "./components/layout/SideNav";
import Header from "./components/layout/Header";
import AddSongForm from "./components/AddSongs&Albums/AddSongForm";
import CreateAlbumForm from "./components/AddSongs&Albums/CreateAlbumForm";
import AddSongInAlbum from "./components/AddSongs&Albums/AddSongInAlbum";
import SongsForYouSection from "./components/ViewSongs&Albums/SongsForYouSection";
import AlbumSection from "./components/ViewSongs&Albums/AlbumSection";
import ShowActiveAlbum from "./components/ViewSongs&Albums/ShowActiveAlbum";
import SongCard from "./components/SongCard.jsx";
import Modal from "./components/common/Modal";
import { useHScroll } from "./useHScroll.js";
import { Toaster, toast } from "sonner";
import { DEFAULT_SONGS } from "./utils/defaultSongs.js";

const SONGS_KEY = "music_library_songs";
const ALBUMS_KEY = "music_library_albums";
const LIKED_SONGS_KEY = "music_library_liked_songs";

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
  const isUser = role === "user";

  const [isSideOpen, setIsSideOpen] = useState(
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
  );

  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const existing = load(SONGS_KEY, null);
    if (!existing || existing.length === 0) {
      setSongs(DEFAULT_SONGS);
      save(SONGS_KEY, DEFAULT_SONGS);
    } else {
      setSongs(existing);
    }
  }, []);
  useEffect(() => save(SONGS_KEY, songs), [songs]);

  const [albums, setAlbums] = useState([]);
  useEffect(() => setAlbums(load(ALBUMS_KEY, [])), []);
  useEffect(() => save(ALBUMS_KEY, albums), [albums]);

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

  const filteredAlbums = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return albums;
    return albums.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.artist.toLowerCase().includes(query)
    );
  }, [albums, q]);

  const pageSize = 18;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [q, songs]);
  const visible = filtered.slice(0, page * pageSize);

  const songsScroll = useHScroll({
    onNearEnd: () => {
      const more = page * pageSize < filtered.length;
      if (more) setPage((p) => p + 1);
    },
  });

  const albumsScroll = useHScroll();

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

  const [likedSongs, setLikedSongs] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  useEffect(() => {
    setLikedSongs(load(LIKED_SONGS_KEY, []));
  }, []);
  useEffect(() => {
    save(LIKED_SONGS_KEY, likedSongs);
  }, [likedSongs]);
  useEffect(() => {
    setLikedSongs((prev) =>
      prev.filter((ls) => songs.some((s) => s.id === ls.id))
    );
  }, [songs]);

  function toggleLike(song) {
    setLikedSongs((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  }

  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
    setLikedSongs((prev) => prev.filter((s) => s.id !== id));
  };
  const deleteAlbum = (id) =>
    setAlbums((prev) => prev.filter((a) => a.id !== id));

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
    toast.success("Album created successfully")
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
      <div className="flex">
        <Toaster
          position="top-center"
          closeButton
          theme="light"
          duration={2000}
        />
        <SideNav
          isOpen={isSideOpen}
          setIsOpen={setIsSideOpen}
          setShowLiked={setShowLiked}
        />

        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${isSideOpen ? "md:ml-64" : "ml-0"
            }`}
        >
          <Header
            q={q}
            setQ={setQ}
            setOpen={setOpen}
            logout={logout}
            isAdmin={isAdmin}
          />

          <main className="px-3 md:px-6">
            <SongsForYouSection
              rowRef={songsScroll.rowRef}
              visible={visible}
              isAdmin={isAdmin}
              setOpen={setOpen}
              canScrollLeft={songsScroll.canScrollLeft}
              canScrollRight={songsScroll.canScrollRight}
              updateScrollButtons={songsScroll.updateScrollButtons}
              filtered={filtered}
              deleteSong={deleteSong}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              isUser={isUser}
              likedSongs={likedSongs}
              toggleLike={toggleLike}
            />

            <AlbumSection
              isAdmin={isAdmin}
              setOpenAlbumForm={setOpenAlbumForm}
              albums={filteredAlbums}
              setActiveAlbum={setActiveAlbum}
              rowRef={albumsScroll.rowRef}
              canScrollLeft={albumsScroll.canScrollLeft}
              canScrollRight={albumsScroll.canScrollRight}
              updateScrollButtons={albumsScroll.updateScrollButtons}
              deleteAlbum={deleteAlbum}
            />
          </main>
        </div>
      </div>

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

      {showLiked && (
        <Modal title="Liked Songs" onClose={() => setShowLiked(false)}>
          {likedSongs.length === 0 ? (
            <p className="text-sm text-white/50">No liked songs yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {likedSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isUser
                  isLiked
                  onToggleLike={() => toggleLike(song)}
                />
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
