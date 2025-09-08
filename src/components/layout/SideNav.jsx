import NavItem from "../common/NavItem";
import { Menu, X } from "lucide-react";

const SideNav = ({ isOpen, setIsOpen, setShowLiked }) => {
  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-[60] p-2 rounded bg-white/10 hover:bg-white/20"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={[
          "fixed top-0 left-0 h-full z-50 border-r border-white/10 bg-[#0f0f0f] text-white transition-all duration-300",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full",
          "md:translate-x-0",
          isOpen ? "md:w-64" : "md:w-0",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-2xl">🎵</span>
            {isOpen && <span className="font-semibold">Music</span>}
          </div>

          {isOpen && (
            <button
              className="p-1 rounded hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isOpen && (
          <nav className="p-3 space-y-1 text-sm">
            <NavItem active label="Home" />
            <NavItem label="Upgrade" />
              <NavItem
                label="Liked Music"
                onClick={() => {
                  setShowLiked(true);
                  setIsOpen(false);
                }}
              />
              <NavItem label="Episodes for Later"/>
          </nav>
        )}
      </aside>
    </>
  );
};

export default SideNav;