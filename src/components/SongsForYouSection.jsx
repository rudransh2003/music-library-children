import SongCard from "./SongCard";
import EmptyState from "./EmptyState";

const SongsForYouSection = ({ rowRef, visible, isAdmin, setOpen, canScrollLeft, canScrollRight, updateScrollButtons, filtered, deleteSong }) => {
    return (
        <>
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
                                    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 840;
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
        </>
    )
}
export default SongsForYouSection