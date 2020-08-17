import * as React from 'react';

import './MediaModal.scss';

import { MediaItem } from "../../common/SiteData";

interface Props {
	item: MediaItem;
	onClose: (_: React.SyntheticEvent) => void;
}

export default class MediaModal extends React.PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.avoidClose = this.avoidClose.bind(this);
	}

	private avoidClose(e: React.SyntheticEvent): void {
		e.preventDefault();
		e.stopPropagation();
	}

	render() {
		return (<div className="MediaModal" onClick={this.props.onClose}>
			<div className="MediaModal-Card" onClick={this.avoidClose}>
				
			</div>
		</div>);
	}
}
