export const responseSchema = {
	type:"object",
	properties: {
		response: {
			type: "string"
		}
	}
};

export const errorSchema = {
	type:"object",
	properties: {
		message: {
			type: "string"
		}
	}
};