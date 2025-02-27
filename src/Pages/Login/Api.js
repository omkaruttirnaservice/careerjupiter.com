const API_URL = "http://192.168.1.17:5000/api/auth/signin"; // ✅ Correct API URL

export const loginUser = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Login API Error:", error.message);
    throw error;
  }
};
