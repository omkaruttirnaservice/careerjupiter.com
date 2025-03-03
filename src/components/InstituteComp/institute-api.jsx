import { BASE_URL } from "../../utils/constansts";

export const fetchInstitutesData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/class/all`);
      const result = await response.json();
  
      if (result.success && result.data) {
        const parsedData =
          typeof result.data === "string"
            ? JSON.parse(result.data).classes
            : result.data.classes;
  
        // Format the data as required by your UI
        const formattedInstitutes = parsedData.map((cls) => ({
          id: cls._id,
          name: cls.className,
          rank: 5,
          successRatio:
            cls.admissionEntranceDetails?.lastYearCutoffMarks || "N/A",
          image: cls.image.startsWith("http")
            ? cls.image
            : `${BASE_URL}${cls.image}`,
          description: cls.info?.description || "No description available",
          category: cls.Category || "N/A",
          location: `${cls.address?.line1}, ${cls.address?.line2}, ${cls.address?.dist}`,
        }));
  
        return formattedInstitutes;
      } else {
        throw new Error("API response did not return expected data.");
      }
    } catch (error) {
      console.error("Error fetching institutes:", error);
      throw error;
    }
  };
  