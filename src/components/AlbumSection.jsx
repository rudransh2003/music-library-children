import EmptyState from "./EmptyState"

const AlbumSection = (
    {
        isAdmin, setOpenAlbumForm, albums, setActiveAlbum
    }
) => {
    return (
        <>
            <section className="px-6 pt-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold">Albums</h2>
                    {isAdmin && (
                        <button
                            className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:opacity-90"
                            onClick={() => setOpenAlbumForm(true)}
                        >
                            Create album
                        </button>
                    )}
                </div>
                <div className="flex gap-4 overflow-x-auto hscroll pr-6">
                    {albums.length === 0 ? (
                        <EmptyState
                            isAdmin={isAdmin}
                            openModal={() => setOpenAlbumForm(true)}
                            message="No albums yet"
                        />
                    ) : (
                        albums.map((a) => (
                            <div
                                key={a.id}
                                className="w-48 cursor-pointer"
                                onClick={() => setActiveAlbum(a)}
                            >
                                <div className="aspect-square rounded-lg overflow-hidden bg-white/10">
                                    {a.cover ? (
                                        <img src={a.cover} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl">💿</div>
                                    )}
                                </div>
                                <div className="mt-2 font-semibold truncate">{a.title}</div>
                                <div className="text-sm text-white/60 truncate">{a.artist}</div>
                                <div className="text-xs text-white/40">{a.songIds.length} songs</div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    )
}
export default AlbumSection