import { DBAdapter } from "./DBAdapter";
import { DBAdapterInMemory } from "./DBAdapterInMemory";

export const dbAdapter = new DBAdapter();
export const dbAdapterInMemory = new DBAdapterInMemory();