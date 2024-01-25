import { Button, Container } from "@chakra-ui/react";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import React from "react";
import { loadForm } from "../services/formServices";
import { loadSubmissions } from "../services/submissionServices";

const formUid = "yBpOOBYf1uzKgAMsByQu";

async function createExcelFile() {
  try {
    // Step 1: Fetch Form Data
    const form = await loadForm(formUid);

    // Step 2: Fetch Submission Data
    const submissions = await loadSubmissions(formUid);

    // Step 3: Create Excel File
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Submissions");

    // Setting up the first row with questions
    const headers = [
      "No",
      "Submitted Time",
      ...form.questions.map((q) => q.question),
    ];
    worksheet.addRow(headers);

    // Adding each submission as a row
    let submissionNumber = 1;
    submissions.forEach((submission) => {
      const submissionRow = [
        submissionNumber++,
        submission.createdTime, // Assuming submission.id is the timestamp or unique identifier of the submission
        ...form.questions.map((q) => {
          const answer = submission.data[q.questionUid];
          return Array.isArray(answer) ? answer.join(", ") : answer || "";
        }),
      ];
      worksheet.addRow(submissionRow);
    });

    // Write to a file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `submission_${Date.now()}.xlsx`);
    console.log("Excel file created");
  } catch (error) {
    console.error("Error creating excel file: ", error);
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
