import { SafeResourceUrl } from '@angular/platform-browser';

export class File {
	extension: String;
	type: String;
	encode: String;
	data: String;

	// Safe URL to bypass Angular's DomSanitizer
	safeSource: SafeResourceUrl;
}