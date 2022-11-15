import { Questions } from "../../../types/index";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { UnauthorizedError } from "../../../../utils/error";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IRoomRepository) { }

	async execute({ roomCode, userId }: DTO) {

		const roomCodeUser = await this.repository.getUserRoomCode(userId);

		if (roomCode !== roomCodeUser) throw new UnauthorizedError("Só o adminstrador da sala pode fazer essa ação");

		const questions = toolkit.cache.get<Questions>(roomCode);
		const questionsIds = questions?.map(element => element.id);

		const userIds = questions?.map(element => element.userId);

		userIds?.forEach(element => {
			const userQuestions = toolkit.cache.get<Questions>(element);

			const userQuestionsFilter = userQuestions.filter(element => !questionsIds.includes(element.id));

			toolkit.cache.del(element);
			toolkit.cache.set<Questions>(element, userQuestionsFilter);
		});

		await this.repository.destroy(roomCode);

		return roomCode;
	}
}