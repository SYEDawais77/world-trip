import { useEffect } from "react";
import { useAuth } from "../contexts/FakeUserAuth";
import { useNavigate } from "react-router";

export default function ProtectedRoutes({ children }) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticate) {
        navigate("/");
      }
    },
    [isAuthenticate, navigate]
  );
  return isAuthenticate ? children : null;
}
