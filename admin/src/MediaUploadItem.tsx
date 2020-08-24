import * as React from 'react';

import './MediaUploadItem.scss';

import Selectable from "./Selectable";
import { UploadItemData } from "./MediaUploadForm";

import * as Format from "../../common/util/Format";

interface Props {
	file: UploadItemData;
	ind: number;

	editable: boolean;

	onNameChange: (name: string) => void;
	onFilenameChange: (name: string) => void;
}

export default class MediaItem extends React.Component<Props, {}> {
	// callbacks: ClickHandlerCallbacks;

	constructor(props: Props) {
		super(props);

		// this.callbacks = {
		// 	onDoubleClick: this.props.onClick
		// };

		this.handleInputClick = this.handleInputClick.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleFilenameChange = this.handleFilenameChange.bind(this);
	}

	private handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.props.onNameChange(e.target.value);
	}

	private handleFilenameChange(e: React.ChangeEvent<HTMLInputElement>) {
		let start = e.target.selectionStart!;
    let end = e.target.selectionEnd!;

    let oldVal = e.target.value;
		e.target.value = e.target.value.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
		
		if (oldVal.length > e.target.value.length) {
			start -= oldVal.length - e.target.value.length;
			end -= oldVal.length - e.target.value.length;
		}

		e.target.setSelectionRange(start, end);

		this.props.onFilenameChange(e.target.value);
	}

	private handleInputClick(e: React.SyntheticEvent) {
		e.stopPropagation();
	}

	render() {
		const ext = this.props.file.ext;
		const isImage = !!this.props.file.thumbnail;

		let icon = "/admin/asset/icon/ext-unknown-color.svg";
		if (isImage) icon = this.props.file.thumbnail!;
		else {
			if (ext == "pdf") icon = "/admin/asset/icon/ext-pdf-color.svg";
			else if (ext == "md" || ext == "txt") icon = "/admin/asset/icon/ext-txt-color.svg";
			else if (ext == "doc" || ext == "docx") icon = "/admin/asset/icon/ext-document-color.svg";
			else if (ext == "xls" || ext == "xlsx") icon = "/admin/asset/icon/ext-sheet-color.svg";
			else if (ext == "ppt" || ext == "pptx") icon = "/admin/asset/icon/ext-slideshow-color.svg";
		}

		const identifier = this.props.file.name.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

		return (
			<Selectable className="MediaUploadItem" ind={this.props.ind} doubleClickSelects={true}>
				<img src={icon} className={"MediaItem-Image" + (isImage ? "" : " icon")}/>
				<div className="MediaItem-Description">	

					<input type="text" className="MediaItem-Name" value={this.props.file.name} disabled={!this.props.editable}
						onChange={this.handleNameChange} onMouseUp={this.handleInputClick} maxLength={32}/>

					<input type="text" className="MediaItem-FileName" value={this.props.editable ? this.props.file.identifier : 
						(identifier + "." + this.props.file.ext)} disabled={!this.props.editable} maxLength={32}
						onChange={this.handleFilenameChange} onMouseUp={this.handleInputClick} placeholder={identifier}/>

					<p className="MediaItem-Metadata">{`${Format.bytes(this.props.file.file.size)} • ` +
						`Last modified ${Format.date(this.props.file.file.lastModified)}`}</p>

				</div>
			</Selectable>
		);
	}
}
