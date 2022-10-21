export interface IDBAdapter {
	connect(): Promise<void>
	closeConnection(): Promise<void>
	setEntity(table: string): IDBAdapter;
	insert<Type>(data: Type, table?: string): Promise<Type>;
	getOne<Type>(where: object, operator?: "AND" | "OR", table?: string): Promise<Type>;
	getAll<Type>(where?: object, operator?: "AND" | "OR", table?: string): Promise<Type[]>;
	update<Type>(where: object, data: object, table?: string): Promise<Type>;
	delete<Type>(where: object, table?: string): Promise<Type>;
	deleteMany<Type>(table?: string): Promise<Type[]>;
}