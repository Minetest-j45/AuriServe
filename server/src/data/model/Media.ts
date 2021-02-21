import * as path from 'path';
import { Long } from 'mongodb';
import Mongoose from 'mongoose';
import sizeOf from 'image-size';
import { UploadedFile } from 'express-fileupload';
import { promises as fs, constants as fsc } from 'fs';

import { snowflake } from '../Database';


/**
 * A temporary authentication token for a single user.
 */

export interface IMedia extends Mongoose.Document {
	_id: Long;
	uploader?: Long;

	lastModified: number;
	lastModifier: Long;

	name: string;
	description: string;
	bytes: number;
	fileName: string;
	extension: string;

	size?: {
		width?: number;
		height?: number;
	};

	acceptUpload(upload: UploadedFile, uploader: Long, destPath: string): boolean;
}

export const MediaSchema = new Mongoose.Schema<IMedia>({
	_id: { type: {}, default: snowflake },
	uploader: { type: {} },

	lastModified: { type: Number },
	lastModifier: { type: {} },

	name: { type: String, default: '' },
	identifier: { type: String, default: '' },
	description: { type: String, default: '' },
	bytes: { type: Number, default: 0 },
	extension: { type: String, default: '' },

	size: {
		width: { type: Number },
		height: { type: Number }
	}
});


/**
 * Accepts an uploaded file, updates this document to refer to it,
 * and moves it to the destination provided.
 *
 * @param {UploadedFile} upload - The file to accept.
 * @param {Long} uploader - The user who uploaded the file.
 * @param {string} destPath - The destination to put the uploaded file at.
 * @returns a promise to a boolean indicating success.
 */

MediaSchema.method('acceptUpload', async function(this: IMedia, upload: UploadedFile, uploader: Long, destPath: string) {
	const extension = upload.name.substr(upload.name.lastIndexOf('.') + 1);
	const fullPath = path.join(destPath, this.fileName + '.' + extension);

	try { await fs.access(fullPath, fsc.R_OK); return false; }
	catch (e) { /* An exception here indicates that no file has this file's path. */ }

	await upload.mv(fullPath);

	this.bytes = upload.size;
	this.extension = extension;

	try { this.size = await sizeOf(fullPath); }
	catch (e) { this.size = {}; }
	this.markModified('size');

	this.uploader = uploader;
	this.lastModifier = uploader;
	this.lastModified = Date.now();

	return true;
});

export default Mongoose.model('Media', MediaSchema);
