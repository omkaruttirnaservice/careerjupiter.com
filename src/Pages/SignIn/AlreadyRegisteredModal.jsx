import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";

export default function AlreadyRegisteredModal({
  isOpen,
  onClose,
  onNavigateToSignIn,
}) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Already Registered
          </h2>
          <p className="text-gray-600 mb-6">
            This mobile number is already registered with us. Please sign in to
            continue.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
            onClick={() => {
              onNavigateToSignIn(); // Close popup
              navigate("/Sign-in"); // Navigate to Sign In page
            }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AlreadyRegisteredModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigateToSignIn: PropTypes.func.isRequired,
};
