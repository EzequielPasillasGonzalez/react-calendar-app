import { useAuthStore } from "@/store/index.ts";

export const Navbar = () => {
  const onLogout = useAuthStore((state) => state.onLogout);

  const onLogoutClick = () => {
    onLogout("Sesión cerrada");
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt" />
        {""} Cheke
      </span>

      <button className="btn btn-outline-danger" onClick={onLogoutClick}>
        <i className="fas fa-sign-out-alt" />
        <span>Salir</span>
      </button>
    </div>
  );
};
