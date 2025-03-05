import React from 'react';
import {
	FaUniversity,
	FaBookOpen,
	FaTrophy,
	FaUserGraduate,
	FaClipboardCheck,
	FaBuilding,
	FaMedal,
} from 'react-icons/fa';

const UniversityRanking = () => {
	const rankings = [
		{ year: 2021, rank: '1st Rank in the University' },
		{ year: 2022, rank: '3rd Rank in the University' },
	];
	return (
		<div>
			<div className="mt-6 bg-grey-50 p-4 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-101">
				<h3 className="text-lg font-semibold flex items-center gap-2">
					<FaTrophy className="text-red-500 text-xl" /> University Rankings
				</h3>
				<ul className="mt-2 text-gray-700 text-sm">
					{rankings.map((item, index) => (
						<li key={index} className="mt-1 flex items-center gap-2">
							<FaMedal className="text-yellow-500" /> {item.year}: {item.rank}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default UniversityRanking;
