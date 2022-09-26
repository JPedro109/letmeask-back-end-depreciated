class Question {
	readonly id: string;
	user_id: string;
	room_code: string;
	question: string;
	response?: string;
	created_at?: Date;
	updated_at?: Date;
}

export { Question };