
const SidebarItem = ({ icon, text, active,onClick }) => (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`} onClick={onClick}>
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );


export default SidebarItem