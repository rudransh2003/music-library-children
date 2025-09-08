const uid = () => Date.now() + Math.random().toString(16).slice(2);

export const DEFAULT_SONGS = [
  {
    id: uid(),
    title: "After hours (default)",
    artist: "Weeknd",
    album: "My dear melancholy",
    duration: "3:53",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgajFVRPV0zqRnrt2J-ijkli4DvFuX80D5xN-fO7xf14JJiy5-LidXC7o&s",
    createdAt: Date.now(),
  },
  {
    id: uid(),
    title: "For a reason (default)",
    artist: "Karan Aujla",
    album: "P-Pop Culture",
    duration: "3:20",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/P-Pop_Culture.jpg/250px-P-Pop_Culture.jpg",
    createdAt: Date.now(),
  },
  {
    id: uid(),
    title: "My eyes (default)",
    artist: "Travis Scott",
    album: "Utopia",
    duration: "3:23",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Travis_Scott_-_Utopia.png/250px-Travis_Scott_-_Utopia.png",
    createdAt: Date.now(),
  },
  {
    id: uid(),
    title: "Flight (default)",
    artist: "Hans Zimmer",
    album: "The Dark Knight",
    duration: "4:45",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Darkknight_cd.jpg/250px-Darkknight_cd.jpg",
    createdAt: Date.now(),
  },
];