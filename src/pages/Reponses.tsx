import { Button, Container } from "@chakra-ui/react";
import React from "react";
import Excel from "exceljs";
import { saveAs } from "file-saver";

async function createExcelFile() {
  // Create a new workbook
  const workbook = new Excel.Workbook();

  // Add a new worksheet
  const worksheet = workbook.addWorksheet("My Sheet");

  // Add some data as rows
  worksheet.addRow(["Name", "Age", "Location"]);
  worksheet.addRow(["John Doe", 30, "New York"]);
  worksheet.addRow(["Jane Smith", 28, "London"]);

  // Write to a file
  const buffer = await workbook.xlsx.writeBuffer();
  try {
    saveAs(new Blob([buffer]), "file.xlsx");
    console.log("Excel file created");
  } catch (error) {
    console.log("Error writing excel export", error);
  }
}

const Reponses = () => {
  return (
    <Container textAlign={"center"}>
      <Button mt={6} variant={"link"} onClick={createExcelFile}>
        Donwload sheet file
      </Button>
    </Container>
  );
};

export default Reponses;
