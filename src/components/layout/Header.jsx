import { toast } from "sonner";

const Header = ({ q, setQ, setOpen, logout, isAdmin }) => {
  return (
    <header className="sticky top-0 left-0 z-30 bg-[#0f0f0f]/85 border-b border-white/10">
      <div className="flex items-center gap-2 sm:gap-3 h-12 sm:h-14 px-3 md:px-6">
        <div className="flex-1 min-w-0">
          <div className="w-full max-w-full sm:max-w-2xl">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <span className="text-sm sm:text-base">🔎</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search songs, artists, albums"
                className="bg-transparent outline-none w-full text-xs sm:text-sm placeholder-white/60"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAdmin && (
            <button
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-black text-xs sm:text-sm font-medium hover:opacity-90"
              onClick={() => setOpen(true)}
            >
              Add song
            </button>
          )}
          <button
            className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs sm:text-sm"
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                logout();
                toast.success("Logged out");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
