import { File } from './file';


export class User {

	id: String;
	username: String;
	password: String;
	name: String;
	type_id: String;
	avatar: File;

	isFriend: boolean;
}