const Field = ({ label, children }) => {
    return (
        <label className="block">
            <div className="text-xs uppercase tracking-wide mb-1 text-white/50">
                {label}
            </div>
            {children}
        </label>
    );
}
export default Field