import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Dialog } from "@headlessui/react";
import { MONTHS } from "../../utils/constansts";
import { toast } from "react-toastify";
import { setEducation } from "./Api";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

export default function EducationFormModal({ isOpen, setIsOpen, getProfileRefetch }) {
  const { userId } = useSelector((state) => state.auth);

  const mutation = useMutation({
    mutationFn: setEducation,
    onSuccess: (data) => {
      console.log(data, "Add Eduction data");
      Swal.fire({
        title: "Are you sure to add Eduction data ?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Add Education data successfully!");
        }
      });
       getProfileRefetch();
    },

    onError: (error) => {},
  });

  const validationSchema = Yup.object().shape({
    school: Yup.string().required("School/College name is required"),
    fieldOfStudy: Yup.string().required("Field of Study is required"),
    startMonth: Yup.string().required("Start Month is required"),
    startYear: Yup.number()
      .typeError("Start Year must be a number")
      .required("Start Year is required"),
    endMonth: Yup.string().when("isPursuing", {
      is: false,
      then: (schema) => schema.required("End Month is required"),
    }),
    endYear: Yup.number()
      .typeError("End Year must be a number")
      .when("isPursuing", {
        is: false,
        then: (schema) =>
          schema
            .required("End Year is required")
            .moreThan(
              Yup.ref("startYear"),
              "End Year must be greater than Start Year"
            ),
      }),
    description: Yup.string().max(500, "Description is too long"),
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center overflow-scroll"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hidden">
        <h2 className="text-xl font-semibold mb-4">Add Education</h2>
        <Formik
          initialValues={{
            school: "",
            fieldOfStudy: "",
            isPursuing: false,
            isCompleted: false,
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            mutation.mutate({
              user_id: userId,
              education: [
                {
                  education_name: values.fieldOfStudy,
                  school: values.school,
                  is_pursuing: values.isPursuing,
                  start_year: {
                    month: values.startMonth,
                    year: values.startYear,
                  },
                  end_year: { month: values.endMonth, year: values.endYear },
                  description: values.description,
                },
              ],
            });
            resetForm();
            setIsOpen(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium">
                  School/College Name
                </label>
                <Field name="school" className="w-full p-2 border rounded" />
                <ErrorMessage
                  name="school"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium">
                  Field of Study
                </label>
                <Field
                  name="fieldOfStudy"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="fieldOfStudy"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex mb-1.5 items-center">
                  <Field
                    type="checkbox"
                    name="isPursuing"
                    className="mr-2 cursor-pointer"
                    onChange={(e) => {
                      setFieldValue("isPursuing", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("endMonth", "");
                        setFieldValue("endYear", "");
                        setFieldValue("isCompleted", false);
                      }
                    }}
                  />
                  Currently Pursuing
                </label>
                <label className="flex mb-1.5 items-center">
                  <Field
                    type="checkbox"
                    name="isCompleted"
                    className="mr-2 cursor-pointer"
                    onChange={(e) => {
                      setFieldValue("isCompleted", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue("isPursuing", false);
                      }
                    }}
                    disabled={values.isPursuing}
                  />
                  Completed
                </label>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium">
                  Start Date
                </label>
                <div className="flex gap-4">
                  <Field
                    as="select"
                    name="startMonth"
                    className="w-full p-2 border rounded cursor-pointer"
                  >
                    <option value="">Month</option>
                    {MONTHS.map((month) => (
                      <option
                        key={month}
                        value={month}
                        className="cursor-pointer"
                      >
                        {month}
                      </option>
                    ))}
                  </Field>
                  <Field
                    as="select"
                    name="startYear"
                    className="w-full p-2 border rounded cursor-pointer"
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option
                        key={year}
                        value={year}
                        className="cursor-pointer"
                      >
                        {year}
                      </option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage
                  name="startMonth"
                  component="p"
                  className="text-red-500 text-sm"
                />
                <ErrorMessage
                  name="startYear"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {!values.isPursuing && (
                <div>
                  <label className="block mb-1.5 text-sm font-medium">
                    End Date
                  </label>
                  <div className="flex gap-4">
                    <Field
                      as="select"
                      name="endMonth"
                      className="w-full p-2 border rounded cursor-pointer"
                    >
                      <option value="">Month</option>
                      {MONTHS.map((month) => (
                        <option
                          key={month}
                          value={month}
                          className="cursor-pointer"
                        >
                          {month}
                        </option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="endYear"
                      className="w-full p-2 border rounded cursor-pointer"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          className="cursor-pointer"
                        >
                          {year}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="endMonth"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                  <ErrorMessage
                    name="endYear"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1.5 text-sm font-medium">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border rounded"
                  rows="3"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
