import axios from "axios";
import { BASE_URL } from "../../utils/constansts";


export const uploadIqTestPdf = async ({ userId, iqTestId, reportType, certificate, report }) => {
  const payload = {
    userId,
    _id: iqTestId,
    reportType,
    certificate,
    report,
  };

  try {
    
    const response = await axios.post(`${BASE_URL}/api/iqtest/upload-pdf`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to upload PDF");
    }

    
    return response.data;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};
