const SongCard = ( {song, canDelete, onDelete }) =>{
    return (
      <div className="w-[168px] shrink-0">
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-white/10 cursor-pointer">
          {song.cover ? (
            <img
              alt={song.title}
              src={song.cover}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center text-5xl">
              🎶
            </div>
          )}
        </div>
        <div className="mt-2">
          <div className="truncate font-semibold">{song.title}</div>
          <div className="truncate text-sm text-white/60">{song.artist}</div>
          <div className="text-xs text-white/40">{song.album}</div>
        </div>
        <div className="flex items-center justify-between mt-1 text-xs text-white/50">
          <span>{song.duration}</span>
          {canDelete && (
            <button
              onClick={onDelete}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/15"
              title="Delete"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
  export default SongCard