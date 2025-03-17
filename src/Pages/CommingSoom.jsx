import React from 'react';
import { motion } from 'framer-motion';
import commingSoonImg from '../assets/images/comming-soon.jpg';
const ComingSoon = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<motion.div>
				<motion.img
					src={commingSoonImg}
					alt="Coming Soon"
					style={{ width: '350px', cursor: 'pointer' }}
					// whileHover={{ scale: 1.1, rotate: 5 }}
					// transition={{ duration: 0.5 }}
				/>
			</motion.div>
		</div>
	);
};
export default ComingSoon;
