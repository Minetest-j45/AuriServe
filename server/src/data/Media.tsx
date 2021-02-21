import * as path from 'path';
import { Long } from 'mongodb';
import { promises as fs } from 'fs';
import { UploadedFile } from 'express-fileupload';

import { snowflake } from './Database';
import MediaModel, { IMedia } from './model/Media';


/**
 * Handles media elements, including image optimization and file uploading.
 */

export default class Media {
	constructor(private dataPath: string) {};


	/**
	 * Gets a media document from its id.
	 *
	 * @param {Long} id - The media elements's snowflake.
	 * @returns the media document, or null if there is no media element with that id.
	 */

	async getMedia(id: Long) {
		return MediaModel.findById(id);
	}


	/**
	 * Adds a new media element to the database, or replaces an existing one.
	 *
	 * @param {Long} uploader - The user to attribute this media element to.
	 * @param {UploadedFile} upload - The media file to accept.
	 * @param {string | undefined} name - The name of the file, if this is undefined and replace is set, the old name will be preserved.
	 * @param {string | undefined} fileName - The file's fileName, if this is undefined and replace is set, the old fileName will be preserved.
	 * @param {Long | undefined} replace - If set, this media element will be updated instead of creating a new media element.
	 * @returns a promise to a boolean indicating success.
	 */

	async addMedia(uploader: Long, upload: UploadedFile, name: string | undefined,
		fileName: string | undefined, replace?: Long): Promise<boolean> {

		if ((fileName && fileName.length > 32) || (name && name.length > 32)) return false;

		// TODO: Implement fullness check.
		const full = false;
		if (full) return false;

		const media: IMedia = (replace ? await MediaModel.findById(replace) : null) ?? new MediaModel({ _id: snowflake() });
		if (media.isNew && (!fileName || !name)) return false;

		media.name = name ?? media.name;
		media.fileName = fileName ?? media.fileName;
		
		const res = media.acceptUpload(upload, uploader, path.join(this.dataPath, 'media'));
		if (res) await media.save();
		return res;
	}


	/**
	 * Removes a media element by its id.
	 *
	 * @param {Long} id - The snowflake of the media element to remove.
	 * @param {boolean} deleteFile - Whether or not the file on the hard drive should be deleted as well. Default true.
	 * @returns the deleted media document, or null if it did not exist.
	 */

	async removeMedia(id: Long, deleteFile: boolean = true) {
		const media = await MediaModel.findByIdAndDelete(id);
		if (!media) return null;
		if (deleteFile) await fs.unlink(path.join(this.dataPath, 'media', media.fileName + '.' + media.extension));
		return media;
	}
}
