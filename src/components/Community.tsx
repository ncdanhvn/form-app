import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import FormCard from "./FormCard";
import { Form } from "../types/form";
import { firestore } from "../firebaseConfig";
import { loadForm } from "../services/formServices";
import { Box, Input } from "@chakra-ui/react";
import Loading from "./Loading";

const Community: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSharedForms = async () => {
      const sharedFormsRef = doc(firestore, "sharedForms", "sharedList");
      const sharedFormsDoc = await getDoc(sharedFormsRef);

      if (sharedFormsDoc.exists()) {
        const sharedFormIds = sharedFormsDoc.data().formIds as string[];
        const formsData = await Promise.all(
          sharedFormIds.map((formUid) => loadForm(formUid))
        ); // Assuming loadForm returns Form
        setForms(formsData);
      }
    };

    fetchSharedForms();
  }, []);

  return !forms ? (
    <Loading />
  ) : (
    <>
      <Box display="flex" justifyContent="center" mb="4">
        <Input
          placeholder="Search forms..."
          width="300px"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderRadius={"3xl"}
          mt={4}
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap="20px"
        px={5}
        py={3}
      >
        {forms
          .filter(
            (form) =>
              form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              form.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((form) => (
            <FormCard key={form.uid} form={form} />
          ))}
      </Box>
    </>
  );
};

export default Community;
