export interface IDatabase {
	connect: () => void;
	disconnect: () => void;
	client: any;
}
