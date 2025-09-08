import SongCard from "../SongCard";
import EmptyState from "../common/EmptyState";

const SongsForYouSection = ({
    rowRef,
    canScrollLeft,
    canScrollRight,
    updateScrollButtons,
    visible,
    isAdmin,
    setOpen,
    deleteSong,
    filtered,
    page,
    setPage,
    pageSize,
    scrollLeft,
    scrollRight,
    isUser,
    likedSongs,
    toggleLike,
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
        setTimeout(() => {
            updateScrollButtons();
            const moreAvailable = page * pageSize < filtered.length;
            if (moreAvailable) {
                const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 240;
                if (nearEnd) setPage((p) => p + 1);
            }
        }, 50);
    };

    const handleScrollLeft = scrollLeft ?? fallbackScrollLeft;
    const handleScrollRight = scrollRight ?? fallbackScrollRight;

    return (
        <section className="pt-4 md:pt-6 pb-1 md:pb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 md:mb-4">
                Songs for you
            </h2>

            <div className="relative group">
                {canScrollLeft && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div ref={rowRef} className="hscroll overflow-x-auto overflow-y-hidden pr-3 md:pr-6">
                    <div className="flex gap-3 md:gap-4">
                        {visible.length === 0 ? (
                            <EmptyState isAdmin={isAdmin} openModal={() => setOpen(true)} type="song" />
                        ) : (
                            visible.map((s) => (
                                <SongCard
                                    key={s.id}
                                    song={s}
                                    canDelete={isAdmin}
                                    onDelete={() => deleteSong(s.id)}
                                    isUser={isUser}
                                    isLiked={likedSongs.some((ls) => ls.id === s.id)}
                                    onToggleLike={() => toggleLike(s)}
                                />
                            ))
                        )}
                    </div>
                </div>
                {canScrollLeft && (
                    <button
                        type="button"
                        aria-label="Scroll left"
                        onClick={handleScrollLeft}
                        className="absolute left-2 md:left-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10"
                    >
                        ‹
                    </button>
                )}
                {canScrollRight && (
                    <button
                        type="button"
                        aria-label="Scroll right"
                        onClick={handleScrollRight}
                        className="absolute right-2 md:right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 md:w-9 md:h-9rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10"
                    >
                        ›
                    </button>
                )}
            </div>

            {visible.length < filtered.length && (
                <div className="text-center text-white/50 text-[11px] md:text-xs mt-2 md:mt-3">
                    Scroll or tap › to load more
                </div>
            )}
        </section>
    );
};

export default SongsForYouSection;