// // src/utils/logUserActivity.js
import { showPopup } from "../redux/eligibilitySlice";
import { logUserActivityAPI } from "../api";

export const logUserActivity = ({ userId, collegeId, token }) => async (dispatch) => {
  try {
    const res = await logUserActivityAPI({ userId, collegeId, token });

    if (!res.data?.success || res.data.data === null) {
      dispatch(showPopup());
      return false; // ❌ Failed
    }

    return true; // ✅ Success
  } catch (error) {
    dispatch(showPopup());
    return false; // ❌ Failed due to error
  }
};
