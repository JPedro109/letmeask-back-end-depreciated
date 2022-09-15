class Question {
	readonly id: string;
	user_id: string;
	room_code: string;
	name: string;
	response?: string;
	created_at?: Date;
	updated_at?: Date;
}

export { Question };