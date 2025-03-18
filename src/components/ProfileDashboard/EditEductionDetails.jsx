import { Dialog } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MONTHS } from "../../utils/constansts";
import { updateEducation } from "./Api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
  

const EditEductionDetails = ({
  selectedEducation,
  isOpenEdit,
  setIsOpenEdit,
  getProfileRefetch,
}) => {
  const { userId } = useSelector((state) => state.auth);

  const mutation = useMutation({
    mutationFn: updateEducation,
    onSuccess: (data) => {
      console.log(data, "Add Eduction data");
      toast.success("Edit Eduction data successful!");
      getProfileRefetch();
    },

    onError: (error) => {},
  });

  const validationSchema = Yup.object().shape({
    education_name: Yup.string().required("Field of Study is required"),
    school: Yup.string().required("School name is required"),
    startMonth: Yup.string().required("Start Month is required"),
    startYear: Yup.number()
      .typeError("Start Year must be a number")
      .required("Start Year is required"),
    endMonth: Yup.string().required("End Month is required"),
    endYear: Yup.number()
      .typeError("End Year must be a number")
      .required("End Year is required")
      .moreThan(
        Yup.ref("startYear"),
        "End Year must be greater than Start Year"
      ),
  });
  return (
    <>
      <Dialog
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Edit Education</h2>
          {selectedEducation && (
            <Formik
              initialValues={{
                education_name: selectedEducation.education_name,
                school: selectedEducation.school,
                startMonth: selectedEducation.start_year.month,
                startYear: selectedEducation.start_year.year,
                endMonth: selectedEducation.end_year.month,
                endYear: selectedEducation.end_year.year,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Updated Education Data:", values);
                setIsOpenEdit(false);
                mutation.mutate({
                  user_id: userId,
                  educationData: {
                    education: [
                      {
                        education_name: values.education_name,
                        school: values.school,
                        start_year: {
                          month: values.startMonth,
                          year: values.startYear,
                        },
                        end_year: {
                          month: values.endMonth,
                          year: values.endYear,
                        },
                      },
                    ],
                  },
                });
              }}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Field of Study
                    </label>
                    <Field
                      name="education_name"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="education_name"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      School Name
                    </label>
                    <Field
                      name="school"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="school"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1 text-sm font-medium">
                        Start Month
                      </label>
                      <Field
                        as="select"
                        name="startMonth"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Month</option>
                        {MONTHS.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="startMonth"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="block mb-1 text-sm font-medium">
                        Start Year
                      </label>
                      <Field
                        as="select"
                        name="startYear"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Year</option>
                        {Array.from(
                          { length: 50 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="startYear"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1 text-sm font-medium">
                        End Month
                      </label>
                      <Field
                        as="select"
                        name="endMonth"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Month</option>
                        {MONTHS.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="endMonth"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="block mb-1 text-sm font-medium">
                        End Year
                      </label>
                      <Field
                        as="select"
                        name="endYear"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Year</option>
                        {Array.from(
                          { length: 50 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="endYear"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenEdit(false)}
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
          )}
        </div>
      </Dialog>
    </>
  );
};

export default EditEductionDetails;