import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Logging out...</p>
    </div>
  );
}
