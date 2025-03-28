import { Field, ErrorMessage } from "formik";
import { educationOptions } from "../../Constant/constantData";

export default function ProfileForm({
  requirement,
  isLoading,
  showAskLater,
  onAskLater,
}) {
  return (
    <div className="space-y-4">
      {requirement === 'firstName' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Field
            name="f_name"
            type="text"
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage
            name="f_name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      )}

      {requirement === 'lastName' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Field
            name="l_name"
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage
            name="l_name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      )}

      {requirement === 'education' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Education
          </label>
          <Field
            name="info.current_education"
            as="select"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="">Select your education</option>
            {educationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="info.current_education"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            isLoading
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        {showAskLater && (
          <button
            type="button"
            onClick={onAskLater}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Ask Me Later
          </button>
        )}
      </div>
    </div>
  );
}