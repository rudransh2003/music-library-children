import { useState } from "react";
import Modal from "../common/Modal";
import Field from "../common/Field";

const CreateAlbumForm = ({ createAlbum, albumForm, onAlbumChange, setOpenAlbumForm }) => {
  const [coverMode, setCoverMode] = useState("link");

  const handleFilePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onAlbumChange({ target: { name: "cover", value: String(reader.result || "") } });
    };
    reader.readAsDataURL(file);
  };

  const clearCover = () => {
    onAlbumChange({ target: { name: "cover", value: "" } });
  };

  return (
    <Modal title="Create album" onClose={() => setOpenAlbumForm(false)}>
      <form
        onSubmit={createAlbum}
        className="
          w-full text-white
          space-y-3 sm:space-y-4
          max-h-[70vh] overflow-y-auto
        "
      >
        <Field label="Title *">
          <input
            name="title"
            value={albumForm.title}
            onChange={onAlbumChange}
            placeholder="Album title"
            className="w-full bg-white/10 rounded px-3 py-2 sm:py-2.5 outline-none text-sm sm:text-base focus:bg-white/15"
            autoFocus
            required
          />
        </Field>

        <Field label="Artist *">
          <input
            name="artist"
            value={albumForm.artist}
            onChange={onAlbumChange}
            placeholder="Artist name"
            className="w-full bg-white/10 rounded px-3 py-2 sm:py-2.5 outline-none text-sm sm:text-base focus:bg-white/15"
            required
          />
        </Field>

        <Field label="Planned # of songs">
          <input
            name="planned"
            value={albumForm.planned}
            onChange={onAlbumChange}
            placeholder="e.g. 10"
            inputMode="numeric"
            className="w-full bg-white/10 rounded px-3 py-2 sm:py-2.5 outline-none text-sm sm:text-base focus:bg-white/15"
          />
        </Field>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/80">Cover image:</span>
            <div className="ml-auto flex rounded-full bg-white/10 p-1">
              <button
                type="button"
                onClick={() => setCoverMode("link")}
                className={
                  "px-3 py-1.5 rounded-full text-xs " +
                  (coverMode === "link" ? "bg-white text-black" : "text-white/80 hover:text-white")
                }
                aria-pressed={coverMode === "link"}
              >
                Link
              </button>
              <button
                type="button"
                onClick={() => setCoverMode("upload")}
                className={
                  "px-3 py-1.5 rounded-full text-xs " +
                  (coverMode === "upload" ? "bg-white text-black" : "text-white/80 hover:text-white")
                }
                aria-pressed={coverMode === "upload"}
              >
                Upload
              </button>
            </div>
          </div>

          {coverMode === "link" ? (
            <Field label="Cover URL">
              <input
                name="cover"
                value={albumForm.cover}
                onChange={onAlbumChange}
                placeholder="https://…"
                className="w-full bg-white/10 rounded px-3 py-2 sm:py-2.5 outline-none text-sm sm:text-base break-all focus:bg-white/15"
              />
            </Field>
          ) : (
            <Field label="Upload image">
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFilePick}
                  className="block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-black hover:file:opacity-90"
                />
              </div>
            </Field>
          )}

          {albumForm.cover ? (
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded overflow-hidden bg-white/10">
                <img
                  src={albumForm.cover}
                  alt="Album cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={clearCover}
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs"
              >
                Remove cover
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-1">
          <button
            type="button"
            onClick={() => setOpenAlbumForm(false)}
            className="w-full sm:w-auto px-4 py-2 rounded bg-white/10 hover:bg-white/15 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded bg-white text-black text-sm font-medium hover:opacity-90"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAlbumForm;