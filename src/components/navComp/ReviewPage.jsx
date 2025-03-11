import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ShowReviews from './ReviewList';
import { submitReview, fetchUserDetails } from './Api';
import Cookies from 'js-cookie';

const ReviewPage = ({ reviewCollegeName, reviewUniversityName }) => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const [selectedRating, setSelectedRating] = useState(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [loggedInMobile, setLoggedInMobile] = useState('');

	const { pathname } = useLocation();
	const reviewType = pathname.split('/')[1];

	// Fetch user mobile number
	useEffect(() => {
		const userId = Cookies.get('userId');
		// console.log(userId, "userID");
		if (userId) {
			fetchUserDetails(userId)
				.then((data) => {
					if (data?.data?.mobile_no) {
						setLoggedInMobile(data.data.mobile_no);
						Cookies.set('userMobile', data.data.mobile_no);
					}
					console.log(data, 'data');
				})
				.catch((error) => console.error('Error fetching user details:', error));
		}
	}, []);

	// Submit review mutation
	const mutation = useMutation({
		mutationFn: submitReview,
		onSuccess: () => {
			queryClient.invalidateQueries(['reviews', id]);
			formik.resetForm();
			setSelectedRating(null);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 5000);
		},
	});

	// Formik setup
	const formik = useFormik({
		initialValues: {
			studentMobile: loggedInMobile || '',
			comment: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			studentMobile: Yup.string()
				.matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
				.required('Mobile number is required'),
			comment: Yup.string().trim(),
		}),
		onSubmit: (values) => {
			const storedMobile = Cookies.get('userMobile');
			if (values.studentMobile.trim() !== storedMobile?.trim()) {
				alert('Invalid number. Enter the same number used for login.');
				return;
			}

			const reviewData = {
				id,
				studentMobile: values.studentMobile,
				starRating: selectedRating,
				description: values.comment.trim() || ' ',
				type: reviewType,
			};
			mutation.mutate(reviewData);
		},
	});

	return (
		<div className="max-w-6xl mx-auto ">
			<h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
				Leave a Review
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Left Column - Review Form */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					{id ? (
						<p className="mb-4 text-gray-600 text-center">
							<strong>{(reviewCollegeName, reviewUniversityName)}</strong>
						</p>
					) : (
						<p className="text-red-600 font-bold text-center">
							ID not found. Please check the URL.
						</p>
					)}

					{showSuccess && (
						<p className="text-green-600 bg-green-100 p-2 rounded text-center">
							✅ Review submitted successfully!
						</p>
					)}
					{mutation.isError && (
						<p className="text-red-600 bg-red-100 p-2 rounded text-center">
							❌ Failed to submit review. Please try again.
						</p>
					)}

					<form onSubmit={formik.handleSubmit} className="mb-6">
						{/* Mobile Number Input */}
						<div className="mb-3">
							<input
								type="tel"
								name="studentMobile"
								placeholder="Your Mobile Number"
								className="w-full p-2 border rounded"
								{...formik.getFieldProps('studentMobile')}
							/>
							{formik.touched.studentMobile && formik.errors.studentMobile && (
								<div className="text-red-500 text-sm">
									{formik.errors.studentMobile}
								</div>
							)}
						</div>

						{/* Star Rating */}
						<div className="mb-3 flex space-x-2 justify-center">
							{[1, 2, 3, 4, 5].map((num) => (
								<span
									key={num}
									className={`cursor-pointer text-3xl ${
										num <= selectedRating ? 'text-yellow-500' : 'text-gray-400'
									}`}
									onClick={() => setSelectedRating(num)}
								>
									★
								</span>
							))}
						</div>

						{/* Hidden Comment Box */}
						<div className="mb-3 hidden">
							<textarea
								name="comment"
								placeholder="Your Review"
								className="w-full p-2 border rounded"
								rows="3"
								{...formik.getFieldProps('comment')}
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className={`w-full p-2 rounded text-white ${
								mutation.isLoading || selectedRating === null
									? 'bg-gray-400'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
							disabled={mutation.isLoading || selectedRating === null}
						>
							{mutation.isLoading ? 'Submitting...' : 'Submit Review'}
						</button>
					</form>
				</div>

				{/* Right Column - Reviews List */}
				<div className="bg-white shadow-lg rounded-lg h-full">
					<ShowReviews />
				</div>
			</div>
		</div>
	);
};

export default ReviewPage;
