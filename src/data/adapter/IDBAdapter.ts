export interface IDBAdapter<Type> {
	insert(data: Type): Promise<Type>;
	getOne(data: object): Promise<Type>;
	getAll(): Promise<Type[]>;
	update(where: object, data: object): Promise<Type>;
	delete(where: object): Promise<Type>;
}