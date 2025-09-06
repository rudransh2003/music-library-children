import NavItem from "./NavItem"

const SideNav = () => {
    return (
        <aside className="fixed top-0 left-0 h-full w-64 border-r border-white/10 bg-[#0f0f0f]">
            <div className="h-14 flex items-center px-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🎵</span>
                    <span className="font-semibold text-white">Music</span>
                </div>
            </div>
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
        </aside>
    )
}
export default SideNav