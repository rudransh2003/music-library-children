import Modal from "../common/Modal";
import Field from "../common/Field";
import {toast} from "sonner"

const AddSongForm = ({ open, onClose, form, onChange, onSubmit }) => {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(e);
    }
    toast("Song added succesfully")
  };

  return (
    <Modal onClose={onClose} title="Add a song">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Title *">
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
            placeholder="e.g., City Lights"
            autoFocus
          />
        </Field>

        <Field label="Artist *">
          <input
            name="artist"
            value={form.artist}
            onChange={onChange}
            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
            placeholder="e.g., Comet"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Album">
            <input
              name="album"
              value={form.album}
              onChange={onChange}
              className="w-full bg-white/10 rounded px-3 py-2 outline-none"
              placeholder="Optional"
            />
          </Field>
          <Field label="Duration">
            <input
              name="duration"
              value={form.duration}
              onChange={onChange}
              className="w-full bg-white/10 rounded px-3 py-2 outline-none"
              placeholder="mm:ss (default 3:00)"
            />
          </Field>
        </div>

        <Field label="Cover URL">
          <input
            name="cover"
            value={form.cover}
            onChange={onChange}
            className="w-full bg-white/10 rounded px-3 py-2 outline-none"
            placeholder="Optional image URL"
          />
        </Field>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-white text-black font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSongForm;