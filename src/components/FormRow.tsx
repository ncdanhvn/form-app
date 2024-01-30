import React, { useEffect, useState } from "react";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import {
  Box,
  Image,
  Text,
  Button,
  Link,
  Badge,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { Form } from "../types/form";
import moment from "moment";
import { collection, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { loadSubmissions } from "../services/submissionServices";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const FormRow = ({ form }: { form: Form }) => {
  const [responseCount, setResponseCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [submissions, setSubmissions] = useState<any>([]);
  const createdAtFormatted = moment(form.createdAt.toDate()).fromNow();

  useEffect(() => {
    const getResponseCount = async () => {
      try {
        const result = await loadSubmissions(form.uid);
        setSubmissions(result);
        setResponseCount(result.length);
      } catch (error) {
        console.log("Error when fetching submmission");
      }
    };
    getResponseCount();
  }, [form.uid]);

  const handleDownload = async () => {
    setIsDownloading(true);
    await createExcelFile(form, submissions); // Replace with your actual download function
    setIsDownloading(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      mx={2}
      marginBottom="4"
      padding="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="background 0.3s, transform 0.3s, box-shadow 0.3s" // Smooth transition for hover effects
      _hover={{
        backgroundColor: "gray.100", // Change background color on hover
        transform: "translateY(-2px)", // Slightly raise the box
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for depth
      }}
    >
      <Image
        src={form.formThumbnailUrl}
        alt="Form Thumbnail"
        boxSize="128px"
        marginRight="4"
        borderRadius={"md"}
      />
      <Box flex="1" marginRight="4">
        <Text fontWeight="bold" fontSize="lg">
          {form.title}
          <IconButton
            aria-label="Open link"
            icon={<ExternalLinkIcon />}
            size="sm"
            variant="ghost"
            onClick={() => window.open(`/forms/${form.uid}`, "_blank")}
            marginLeft="2"
            position="relative"
            top="-1"
          />
        </Text>
        <Text fontSize="md" color="gray.600">
          {form.description}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Created {createdAtFormatted}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Questions: {form.questions.length}
        </Text>
      </Box>
      <Button marginRight="4" colorScheme="blue">
        Edit
      </Button>
      <Button onClick={handleDownload} marginRight="4" disabled={isDownloading}>
        {isDownloading ? <Spinner size="sm" /> : `Response Sheet`}
        {responseCount !== null && (
          <Badge
            ml="2"
            colorScheme="green"
            fontSize="0.8em"
            py="1"
            px="2"
            borderRadius="lg"
          >
            {responseCount}
          </Badge>
        )}
      </Button>
    </Box>
  );
};

export default FormRow;

async function createExcelFile(form: Form, submissions: any) {
  try {
    // Step 1: Fetch Form Data
    //   const form = await loadForm(formUid);

    // Step 2: Fetch Submission Data
    //   const submissions = await loadSubmissions(formUid);

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
    submissions.forEach((submission: any) => {
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
