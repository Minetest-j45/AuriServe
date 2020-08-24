import * as React from 'react';

import './MediaItem.scss';

import Selectable from "./Selectable";
import { ClickHandlerCallbacks } from "./ClickHandler";

import { Media } from "../../common/DBStructs";
import * as Format from "../../common/util/Format";

interface Props {
	item: Media;
	ind: number;

	onClick: (e: React.SyntheticEvent) => void;
}

export default class MediaItem extends React.Component<Props, {}> {
	callbacks: ClickHandlerCallbacks;

	constructor(props: Props) {
		super(props);

		this.callbacks = {
			onDoubleClick: this.props.onClick
		};
	}

	render() {
		let isImage = this.props.item.ext == "png" || this.props.item.ext == "jpg" || this.props.item.ext == "svg" || this.props.item.ext == "gif";
		let icon = "/admin/asset/icon/ext-unknown-color.svg";

		if (isImage) icon = this.props.item.publicPath;
		else {
			if (this.props.item.ext == "pdf") icon = "/admin/asset/icon/ext-pdf-color.svg";
			else if (this.props.item.ext == "md" || this.props.item.ext == "txt") icon = "/admin/asset/icon/ext-txt-color.svg";
			else if (this.props.item.ext == "doc" || this.props.item.ext == "docx") icon = "/admin/asset/icon/ext-document-color.svg";
			else if (this.props.item.ext == "xls" || this.props.item.ext == "xlsx") icon = "/admin/asset/icon/ext-sheet-color.svg";
			else if (this.props.item.ext == "ppt" || this.props.item.ext == "pptx") icon = "/admin/asset/icon/ext-slideshow-color.svg";
		}

		return (
			<Selectable className="MediaItem" ind={this.props.ind} callbacks={this.callbacks} doubleClickSelects={true}>
				<img src={icon} className={"MediaItem-Image" + (isImage ? "" : " icon")}/>
				<div className="MediaItem-Description">	
					<p className="MediaItem-Title">{this.props.item.name}</p>
					<p className="MediaItem-Author">{`Uploaded by ${this.props.item.uploadUser} ${Format.date(this.props.item.uploadDate)}.`}</p>
					<p className="MediaItem-Size">{(this.props.item.dimensions ? Format.vector(this.props.item.dimensions, 'px') + " • " : "") + Format.bytes(this.props.item.size)}</p>
				</div>
			</Selectable>
		);
	}
}
