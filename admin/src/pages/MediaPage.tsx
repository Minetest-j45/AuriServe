import * as React from 'react';
// import { Link } from 'react-router-dom';

import './Page.scss';
import './MediaPage.scss';

import MediaItem from "../MediaItem";
import MediaModal from "../MediaModal";

import { SiteData } from "../../../common/SiteData";

interface Props {
	data: SiteData;
}

interface State {
	viewed?: number;
}

export default class MediaPage extends React.PureComponent<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {viewed: undefined}

		this.handleOpenMedia = this.handleOpenMedia.bind(this);
		this.handleCloseMedia = this.handleCloseMedia.bind(this);
		this.handleUploadMedia = this.handleUploadMedia.bind(this);
	}

	private handleUploadMedia(_: React.SyntheticEvent): void {
	}

	private handleOpenMedia(ind: number, _: React.SyntheticEvent): void {
		this.setState({viewed: ind});
	}

	private handleCloseMedia(_: React.SyntheticEvent): void {
		this.setState({viewed: undefined});
	}

	render() {
		return (
			<div className="Page MediaPage">
				<main className="Page-Card">
					<div className="Page-Card-Header">
						<img className="Page-Card-Icon" src="/admin/asset/icon/document-dark.svg" />	
						<h1 className="Page-Card-Title">Manage Media</h1>
						<p className="Page-Card-Description">{`Create or remove media assets on ${this.props.data.sitename}.`}</p>
					</div>

					<button className="MediaPage-Add" onClick={this.handleUploadMedia}>
						<img src="/admin/asset/icon/add-dark.svg" />
						Upload Media
					</button>

					<div className="MediaPage-Media">
						{/*<button className="MediaItem" onClick={this.handleUploadMedia}>
							<img className="MediaItem-Image icon" src="/admin/asset/icon/add-dark.svg" />
							<div className="MediaItem-Description">	
								<p className="MediaItem-Title">Upload Media</p>
								<p className="MediaItem-Author">Click here or drag media over to upload.</p>
								<p className="MediaItem-Size">Max file size: 16 MB</p>
							</div>
						</button>*/}
						{this.props.data.media.items.map((a, i) => <MediaItem item={a} key={i} onClick={this.handleOpenMedia.bind(this, i)}/>)}
					</div>
				</main>

				{this.state.viewed != undefined && <MediaModal
					item={this.props.data.media.items[this.state.viewed]}
					onClose={this.handleCloseMedia}
				/>}
			</div>
		);
	}
}
