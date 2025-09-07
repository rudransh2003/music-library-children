const ShowActiveAlbum = (
    {
        setActiveAlbum, activeAlbum, isAdmin, setSelectedIds, setSelectSongsOpen, songsById
    }
) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-[#181818] p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                    <button
                        className="mb-4 px-3 py-1 rounded bg-white/10"
                        onClick={() => setActiveAlbum(null)}
                    >
                        Close
                    </button>
                    <div className="flex gap-6">
                        <div className="w-64 h-64 rounded-lg overflow-hidden bg-white/10">
                            {activeAlbum.cover ? (
                                <img src={activeAlbum.cover} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl">💿</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold">{activeAlbum.title}</h3>
                            <div className="text-white/70">{activeAlbum.artist}</div>
                            <div className="text-white/40 text-sm mb-4">
                                {activeAlbum.songIds.length} songs
                            </div>
                            {isAdmin && (
                                <button
                                    className="mb-4 px-4 py-2 rounded-full bg-white text-black text-sm"
                                    onClick={() => {
                                        setSelectedIds(
                                            Object.fromEntries(activeAlbum.songIds.map((id) => [id, true]))
                                        );
                                        setSelectSongsOpen(true);
                                    }}
                                >
                                    Add songs for this album
                                </button>
                            )}
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-white/60">
                                        <th className="px-2 py-1">#</th>
                                        <th className="px-2 py-1">Title</th>
                                        <th className="px-2 py-1">Artist</th>
                                        <th className="px-2 py-1 text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeAlbum.songIds.map((id, idx) => {
                                        const s = songsById[id];
                                        if (!s) return null;
                                        return (
                                            <tr key={id} className="border-t border-white/10">
                                                <td className="px-2 py-1">{idx + 1}</td>
                                                <td className="px-2 py-1">{s.title}</td>
                                                <td className="px-2 py-1">{s.artist}</td>
                                                <td className="px-2 py-1 text-right">{s.duration}</td>
                                            </tr>
                                        );
                                    })}
                                    {activeAlbum.songIds.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-2 py-4 text-center text-white/50">
                                                No songs yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShowActiveAlbum