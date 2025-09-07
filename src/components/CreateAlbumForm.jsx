import Field from "./Field"

const CreateAlbumForm = (
    {
        createAlbum, albumForm, onAlbumChange, setOpenAlbumForm
    }
) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <form
                    onSubmit={createAlbum}
                    className="bg-[#181818] p-6 rounded-xl w-full max-w-md space-y-4"
                >
                    <h3 className="text-lg font-semibold">Create album</h3>
                    <Field label="Title *">
                        <input
                            name="title"
                            value={albumForm.title}
                            onChange={onAlbumChange}
                            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
                        />
                    </Field>
                    <Field label="Artist">
                        <input
                            name="artist"
                            value={albumForm.artist}
                            onChange={onAlbumChange}
                            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
                        />
                    </Field>
                    <Field label="Planned # of songs">
                        <input
                            name="planned"
                            value={albumForm.planned}
                            onChange={onAlbumChange}
                            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
                        />
                    </Field>
                    <Field label="Cover URL">
                        <input
                            name="cover"
                            value={albumForm.cover}
                            onChange={onAlbumChange}
                            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
                        />
                    </Field>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setOpenAlbumForm(false)}
                            className="px-4 py-2 rounded bg-white/10"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-white text-black"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateAlbumForm