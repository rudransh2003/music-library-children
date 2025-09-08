import { Heart } from "lucide-react";
import { toast } from "sonner"

const SongCard = ({ song, canDelete, onDelete, isUser, isLiked, onToggleLike }) => {
  return (
    <div className="w-[168px] shrink-0">
      <div className="aspect-square w-full rounded-lg overflow-hidden bg-white/10 cursor-pointer">
        {song.cover ? (
          <img alt={song.title} src={song.cover} className="w-full h-full object-cover" />
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
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
                onDelete();
                toast.success("Song deleted successfully")
              }
            }}
            className="px-2 py-1 rounded bg-white/10 hover:bg-white/15"
            title="Delete"
          >
            Delete
          </button>
        )}



        {isUser && (
          <button onClick={onToggleLike} title="Like">
            <Heart
              className={`w-4 h-4 ${isLiked ? "fill-red-500 stroke-red-500" : "stroke-white"
                }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SongCard;