import { dbAdapter } from "../../adapter";
import { MockRepository } from "./MockRepository";

export const mockRepository = new MockRepository(dbAdapter);