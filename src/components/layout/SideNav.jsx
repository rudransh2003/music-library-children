import NavItem from "./NavItem";
import { Menu, X } from "lucide-react";

/**
 * Controlled sidebar: parent passes isOpen + setIsOpen
 */
const SideNav = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Global opener (mobile + desktop when collapsed) */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-[60] p-2 rounded bg-white/10 hover:bg-white/20"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed top-0 left-0 h-full z-50 border-r border-white/10 bg-[#0f0f0f] text-white transition-all duration-300",
          // width & translate behavior
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full",
          // on md+ we keep it off-canvas when closed, full width when open
          "md:translate-x-0",
          isOpen ? "md:w-64" : "md:w-0",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-2xl">🎵</span>
            {isOpen && <span className="font-semibold">Music</span>}
          </div>

          {/* Collapse/Close */}
          {isOpen && (
            <button
              className="p-1 rounded hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        {isOpen && (
          <nav className="p-3 space-y-1 text-sm">
            <NavItem active label="Home" />
            <NavItem label="Explore" />
            <NavItem label="Library" />
            <NavItem label="Upgrade" />

            <div className="mt-20 mb-20">
              <div className="px-3 text-xs uppercase tracking-wider text-white/50">
                Playlists
              </div>
              <NavItem label="Liked Music" small />
              <NavItem label="Gym" small />
              <NavItem label="Episodes for Later" small />
            </div>
          </nav>
        )}
      </aside>
    </>
  );
};

export default SideNav;