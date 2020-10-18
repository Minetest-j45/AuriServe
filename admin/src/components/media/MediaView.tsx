import * as Preact from 'preact';

import './MediaView.sass';

import UserTag from '../UserTag';
import MediaReplaceForm from './MediaReplaceForm';
import MediaIcon, { mediaIsImage } from './MediaIcon';
import DimensionTransition from '../DimensionTransition';

import * as Format from '../../../../common/util/Format';
import { Media } from '../../../../common/interface/DBStructs';

interface Props {
	item: Media;

	onDelete: () => void;
}

interface State {
	replacing: boolean;
}

export default class MediaView extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);

		this.state = { replacing: false };
	}

	render(props: Props) {
		return (
			<DimensionTransition duration={200}>
				<div className='MediaView'>
					<div class='MediaView-Top'>
						<MediaIcon path={props.item.publicPath} imageIcon={false} />
						<div class='MediaView-Info'>
							<h1 class='MediaView-Name'>{props.item.name}</h1>
							<h2 class='MediaView-Details'>{Format.bytes(props.item.size)} •
							Uploaded by <UserTag identifier={props.item.uploadUser} /> {Format.date(props.item.uploadDate)}</h2>
							<h3 class='MediaView-Path'>{props.item.publicPath}</h3>
						</div>
					</div>

					<div class='MediaView-Toolbar'>
						<div>
							<button onClick={() => this.props.onDelete()}>
								<img src='/admin/asset/icon/trash-dark.svg' alt=''/><span>Delete</span>
							</button>
							<button onClick={this.handleReplace}>
								<img src='/admin/asset/icon/refresh-dark.svg' alt=''/>
								<span>{this.state.replacing ? 'Cancel' : 'Replace File'}</span>
							</button>
						</div>
					</div>

					{!this.state.replacing && <div class='MediaView-Preview'>
						{this.renderPreview()}
					</div>}

					{this.state.replacing &&
						<MediaReplaceForm
							replace={props.item.identifier}
							accept={'.' + props.item.ext}
							onSubmit={this.handleReplaceSubmit} />}
				</div>
			</DimensionTransition>
		);
	}

	private renderPreview() {
		if (mediaIsImage(this.props.item.publicPath)) return <img src={this.props.item.publicPath} alt=''/>;
		return <a class='MediaView-UnknownPreview' href={this.props.item.publicPath} target='_blank'>View File</a>;
	}

	private handleReplace = () => {
		this.setState({ replacing: !this.state.replacing });
	};

	private handleReplaceSubmit = () => {
		/*
		* EXTREMELY DIRTY HACK ALERT:
		* To force updated images to refresh, we fetch the file without using the cache,
		* and then find all img tags referencing it, and force them to re-render by clearing
		* and setting their src parameter in quick succession.
		*/

		fetch(this.props.item.publicPath, { method: 'GET', cache: 'no-cache' }).then(() => {
			Array.from(document.getElementsByTagName('img')).forEach(e => {
				if (e.src.endsWith(this.props.item.publicPath)) {
					e.src = '';
					setTimeout(() => e.src = this.props.item.publicPath, 0);
				}
			});
			setTimeout(this.handleReplace, 16);
		});
	};
};
