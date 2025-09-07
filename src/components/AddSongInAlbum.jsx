const AddSongInAlbum = (
    {
        activeAlbum, songs, selectedIds, toggleSong, setSelectSongsOpen, saveAlbumSongs
    }
) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-[#181818] p-6 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-auto">
                    <h3 className="text-lg font-semibold mb-4">
                        Add songs to {activeAlbum.title}
                    </h3>
                    <ul className="space-y-2">
                        {songs.map((s) => (
                            <li key={s.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={!!selectedIds[s.id]}
                                    onChange={() => toggleSong(s.id)}
                                />
                                <div className="flex-1">
                                    <div>{s.title}</div>
                                    <div className="text-xs text-white/60">
                                        {s.artist} — {s.album}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className="px-4 py-2 rounded bg-white/10"
                            onClick={() => setSelectSongsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-white text-black"
                            onClick={saveAlbumSongs}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddSongInAlbum