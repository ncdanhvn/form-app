// src/components/FormOwnerCheck.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFormsList } from "../services/userServices"; // Adjust the path as needed
import Loading from "./Loading";

const FormOwnerCheck: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { formUid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const userForms = await getUserFormsList();
        if (!userForms.includes(formUid)) {
          navigate("/home");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking form ownership:", error);
        navigate("/home");
      }
    };

    checkOwnership();
  }, [formUid, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default FormOwnerCheck;
