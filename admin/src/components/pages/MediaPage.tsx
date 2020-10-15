import * as Preact from 'preact';

import './Page.sass';
import './MediaPage.scss';

import Modal from '../Modal';
import CardHeader from '../CardHeader';
import SelectGroup from '../SelectGroup';
import MediaItem from '../media/MediaItem';
import MediaView from '../media/MediaView';
import MediaUploadForm from '../media/MediaUploadForm';

import { AppContext } from '../AppContext';

interface State {
	selected: number[];
	viewed?: string;
	uploading: boolean;
	grid: boolean;
}

export default class MediaPage extends Preact.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = { selected: [], viewed: undefined, grid: true, uploading: false };
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeyUp);
		this.context.refreshSiteData('media');
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div className="Page MediaPage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/document-dark.svg" title="Manage Media"
							subtitle={'Create or remove user-uploaded media.'} />

						<div className="MediaPage-Toolbar">
							<div>
								<button className="MediaPage-Toolbar-Button" onClick={this.handleUploadMedia}>
									<img src="/admin/asset/icon/add-dark.svg"/><span>Upload Media</span>
								</button>

								{this.state.selected.length > 0 && <button className="MediaPage-Toolbar-Button" onClick={this.handleDeleteSelection}>
									<img src="/admin/asset/icon/trash-dark.svg"/>
									<span>{this.state.selected.length === 1 ? 'Delete' : 'Delete (' + this.state.selected.length + ')'}</span>
								</button>}
							</div>
							<div>
								{/* <button className="MediaPage-Toolbar-Button" onClick={this.handleUploadMedia}>
									<img src="/admin/asset/icon/sort-dark.svg"/><span>Sort by Size</span>
								</button> */}

								<button className="MediaPage-Toolbar-Button" onClick={this.handleViewToggle}>
									<img src={`/admin/asset/icon/${this.state.grid ? 'grid' : 'list'}-view-dark.svg`}/>
								</button>
							</div>
						</div>

						<SelectGroup
							multi={true}
							onSelectionChange={this.handleSelectionChange}
							className={'MediaPage-Media ' + (this.state.grid ? 'Grid' : 'Stack')}>
							{ctx.data.media.map((a: any, i: number) => <MediaItem
								ind={i}
								item={a}
								key={a.identifier}
								onClick={this.handleOpenMedia.bind(this, a.identifier)}
							/>)}
						</SelectGroup>

						{ctx.data.media.length === 0 && <h2 className="MediaPage-NoMedia">No media found.</h2>}
					</section>

					{this.state.viewed !== undefined && <Modal onClose={this.handleCloseMedia}>
						<MediaView onDelete={this.handleDelete.bind(this, this.state.viewed) as () => void}
							item={ctx.data.media.filter(m => m.identifier === this.state.viewed)[0]}/>
					</Modal>}

					{this.state.uploading && <Modal>
						<CardHeader icon="/admin/asset/icon/document-dark.svg" title="Upload Media"
							subtitle={`Upload new media assets to ${ctx.data.sitename}.`} />
						<MediaUploadForm onCancel={this.handleUploadCancel}/>
					</Modal>}
				</div>
			}</AppContext.Consumer>
		);
	}

	private handleKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'Delete') this.handleDeleteSelection();
	};

	private handleViewToggle = () => {
		this.setState({ grid: !this.state.grid });
	};

	private handleOpenMedia = (key: string) => {
		this.setState({ viewed: key });
	};

	private handleCloseMedia = () => {
		this.setState({ viewed: undefined });
	};

	private handleUploadCancel = () => {
		this.setState({ uploading: false });
	};

	private handleUploadMedia = () => {
		this.handleSelectionChange([]);
		this.setState({ uploading: true });
	};

	private handleDeleteSelection = () => {
		if (this.state.selected.length === 0) return;
		this.handleDelete(...this.state.selected.map(ind => this.context.data.media[ind].identifier));
	};

	private handleDelete = (...identifiers: string[]) => {
		fetch('/admin/media/delete', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(identifiers)
		}).then(r => r.json()).then(res => {
			this.setState({ viewed: undefined });
			this.context.handleSiteData(res);
		});
	};

	private handleSelectionChange = (selected: number[]) => {
		this.setState({ selected: selected });
	};
}

MediaPage.contextType = AppContext;
