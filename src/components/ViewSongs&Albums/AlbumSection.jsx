import EmptyState from "../common/EmptyState";
import { toast } from "sonner";

const AlbumSection = ({
  isAdmin,
  setOpenAlbumForm,
  albums,
  setActiveAlbum,
  rowRef,
  canScrollLeft,
  canScrollRight,
  updateScrollButtons,
  scrollLeft,
  scrollRight,
  deleteAlbum,
}) => {
  const fallbackScrollLeft = () => {
    const el = rowRef?.current;
    if (!el) return;
    el.scrollBy({ left: -600, behavior: "smooth" });
    setTimeout(updateScrollButtons, 50);
  };

  const fallbackScrollRight = () => {
    const el = rowRef?.current;
    if (!el) return;
    el.scrollBy({ left: 600, behavior: "smooth" });
    setTimeout(updateScrollButtons, 50);
  };

  const handleScrollLeft = scrollLeft ?? fallbackScrollLeft;
  const handleScrollRight = scrollRight ?? fallbackScrollRight;

  return (
    <section className="pt-6 md:pt-10">
      <div className="mb-3 md:mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
          Albums
        </h2>

        {isAdmin && (
          <button
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white text-black text-[12px] md:text-sm font-medium hover:opacity-90 flex-shrink-0"
            onClick={() => setOpenAlbumForm(true)}
          >
            Create album
          </button>
        )}
      </div>

      <div className="relative group mt-2 overflow-visible">
        {canScrollLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-3 md:w-4 bg-gradient-to-r from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-3 md:w-4 bg-gradient-to-l from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div
          ref={rowRef}
          className="hscroll overflow-x-auto overflow-y-hidden pr-3 md:pr-6"
        >
          {albums.length === 0 ? (
            <div className="flex">
              <EmptyState
                isAdmin={isAdmin}
                openModal={() => setOpenAlbumForm(true)}
                message="No albums yet"
                type="album"
              />
            </div>
          ) : (
            <div className="flex gap-3 md:gap-4">
              {albums.map((a) => (
                <div key={a.id} className="w-36 sm:w-40 md:w-48 flex-none">
                  <div
                    className="cursor-pointer"
                    onClick={() => setActiveAlbum(a)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/10">
                      {a.cover ? (
                        <img
                          src={a.cover}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl">
                          💿
                        </div>
                      )}
                    </div>

                    <div className="mt-1.5 md:mt-2 font-semibold truncate">
                      {a.title}
                    </div>

                    <div className="text-sm text-white/60 truncate md:text-base">
                      {a.artist}
                    </div>
                    <div className="text-[11px] md:text-xs text-white/40 flex items-center gap-10  md:gap-20">
                      <span>{a.songIds.length} songs</span>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm("Are you sure you want to delete this album?")) {
                              deleteAlbum(a.id);
                              toast.success("Album deleted successfully");
                            }
                          }}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/15"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={handleScrollLeft}
            className="absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10"
          >
            ‹
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={handleScrollRight}
            className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default AlbumSection;