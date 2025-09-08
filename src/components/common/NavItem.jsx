const NavItem = ({ label, active = false, small = false, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={
          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer " +
          (active ? "bg-white/10" : "hover:bg-white/10") +
          (small ? " text-xs" : "")
        }
      >
        <span className="opacity-80">●</span>
        <span>{label}</span>
      </div>
    );
  };
  
  export default NavItem;  