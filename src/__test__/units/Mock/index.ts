import { dbAdapterInMemory } from "../../../data/adapter";
import { MockRepository } from "../../../data/repositories/MockRepository/MockRepository";
import { UserRepository } from "../../../data/repositories/UserRepository/UserRepository";
import { RoomRepository } from "../../../data/repositories/RoomRepository/RoomRepository";
import { QuestionRepository } from "../../../data/repositories/QuestionRepository/QuestionRepository";
import { ResponseRepository } from "../../../data/repositories/ResponseRepository/ResponseRepository";

export const mockRepositoryInMemory = new MockRepository(dbAdapterInMemory);
export const userRepositoryInMemory= new UserRepository(dbAdapterInMemory);
export const roomRepositoryInMemory= new RoomRepository(dbAdapterInMemory);
export const questionRepositoryInMemory= new QuestionRepository(dbAdapterInMemory);
export const responseRepositoryInMemory= new ResponseRepository(dbAdapterInMemory);