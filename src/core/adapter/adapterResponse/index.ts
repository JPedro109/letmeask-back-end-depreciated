// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ok = async (response: any) => {
	return {
		statusCode: 200,
		response: response
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const created = async (response: any) => {
	return {
		statusCode: 201,
		response: response
	};
};


export {
	ok,
	created
};