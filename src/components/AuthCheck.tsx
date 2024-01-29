import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loading from "./Loading";

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthCheck;
