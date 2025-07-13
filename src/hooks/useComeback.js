import { useNavigate } from "react-router-dom";

export function useComeback() {
  const navigate = useNavigate();

  return () => navigate(-1);
}
