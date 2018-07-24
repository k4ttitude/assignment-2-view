import { File } from './file';

export class Document {

	id: String;
	title: String;
	description: String;
	authorId: String;
	content: File;
	status: String;
	view: number;
}