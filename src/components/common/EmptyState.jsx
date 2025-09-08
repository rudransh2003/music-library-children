const EmptyState = ({ isAdmin, openModal, type = "song" }) => {
  const isSong = type === "song";
  return (
    <div className="w-full py-16 text-center text-white/60">
      <div className="text-lg">No {isSong ? "songs" : "albums"} yet</div>
      {isAdmin ? (
        <button
          onClick={openModal}
          className="mt-3 px-4 py-2 rounded-full bg-white text-black text-sm"
        >
          Add your first {isSong ? "song" : "album"}
        </button>
      ) : (
        <div className="text-sm mt-2">
          Ask an admin to add {isSong ? "songs" : "albums"} to the library.
        </div>
      )}
    </div>
  );
};

export default EmptyState;