const Modal = ({ title, onClose, children}) => {
    return (
        <div className="fixed inset-0 z-50">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-[#181818] border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/15"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <div className="pt-4">{children}</div>
            </div>
        </div>
    );
}
export default Modal