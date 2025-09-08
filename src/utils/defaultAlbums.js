const uid = () => Date.now() + Math.random().toString(16).slice(2);

export const DEFAULT_ALBUMS = [
  {
    id: uid(),
    title: "My dear melancholy",
    artist: "The Weeknd (default)",
    planned: 10,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/4/4d/MyDearMelancholy_-_album_by_The_Weeknd.jpg",
    songIds: [],
  },
  {
    id: uid(),
    title: "P-Pop Culture",
    artist: "Karan Aujla (default)",
    planned: 8,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/P-Pop_Culture.jpg/250px-P-Pop_Culture.jpg",
    songIds: [],
  },
  {
    id: uid(),
    title: "Interstellar",
    artist: "Hans Zimmer (default)",
    planned: 15,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    songIds: [],
  },
  {
    id: uid(),
    title: "The Dark Knight Rises",
    artist: "Hans Zimmer (default)",
    planned: 12,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/c/c9/Darkknight_cd.jpg",
    songIds: [],
  },
];