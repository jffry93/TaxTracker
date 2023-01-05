//page transition
export const pageAnimation = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 1,
		},
	},
};

export const slideUp = {
	hidden: { y: 150, opacity: 0 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.75, ease: 'easeOut' },
	},
};

export const slideLeft = {
	hidden: { x: -200, opacity: 0 },
	show: {
		opacity: 1,
		x: 0,
		transition: { ease: 'easeOut', duration: 0.75 },
	},
};

export const fadeIn = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};
