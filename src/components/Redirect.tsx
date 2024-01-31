import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RedirectProps = {
  to: string;
};

const Redirect: FC<RedirectProps> = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
};

export default Redirect;
