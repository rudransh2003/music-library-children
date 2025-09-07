const Header = ({q, setQ, setOpen, logout, isAdmin}) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-[#0f0f0f]/85  border-b border-white/10">
                <div className="pl-64 pr-6 h-14 flex items-center gap-3">
                    <div className="flex-1">
                        <div className="w-full max-w-2xl">
                            <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                                <span>🔎</span>
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search songs, artists, albums"
                                    className="bg-transparent outline-none w-full text-sm placeholder-white/60"
                                />
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <>
                            <button
                                className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:opacity-90"
                                onClick={() => setOpen(true)}
                            >
                                Add song
                            </button>
                        </>
                    )}
                    <button
                        className="ml-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </header>
        </>
    )
}
export default Header