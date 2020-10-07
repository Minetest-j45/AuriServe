import * as Preact from 'preact';

import './Page.sass';
import './MediaPage.scss';

import Modal from '../Modal';
import MediaItem from '../MediaItem';
import MediaView from '../MediaView';
import CardHeader from '../CardHeader';
import SelectGroup from '../SelectGroup';
import MediaUploadForm from '../MediaUploadForm';

import { AppContext } from '../AppContext';

interface State {
	selected: number[];
	viewed?: number;
	uploading: boolean;
	grid: boolean;
}

export default class MediaPage extends Preact.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = { selected: [], viewed: undefined, grid: true, uploading: false };

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleOpenMedia = this.handleOpenMedia.bind(this);
		this.handleViewToggle = this.handleViewToggle.bind(this);
		this.handleCloseMedia = this.handleCloseMedia.bind(this);
		this.handleUploadMedia = this.handleUploadMedia.bind(this);
		this.handleDeleteMedia = this.handleDeleteMedia.bind(this);
		this.handleUploadCancel = this.handleUploadCancel.bind(this);
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
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

								{/* <div className="MediaPage-Toolbar-Separator"/>*/}

								{this.state.selected.length > 0 && <button className="MediaPage-Toolbar-Button" onClick={this.handleDeleteMedia}>
									<img src="/admin/asset/icon/trash-dark.svg"/>
									<span>{this.state.selected.length === 1 ? 'Delete' : 'Delete (' + this.state.selected.length + ')'}</span>
								</button>}
							</div>
							<div>
								<button className="MediaPage-Toolbar-Button" onClick={this.handleUploadMedia}>
									<img src="/admin/asset/icon/sort-dark.svg"/><span>Sort by Size</span>
								</button>

								<button className="MediaPage-Toolbar-Button" onClick={this.handleViewToggle}>
									<img src={`/admin/asset/icon/${this.state.grid ? 'grid' : 'list'}-view-dark.svg`}/>
								</button>
							</div>
						</div>

						<SelectGroup
							multi={true}
							onSelectionChange={this.handleSelectionChange}
							className={'MediaPage-Media ' + (this.state.grid ? 'Grid' : 'Stack')}>
							{ctx.data.media!.map((a: any, i: number) => <MediaItem
								ind={i}
								item={a}
								key={a.identifier}
								onClick={this.handleOpenMedia.bind(this, i)}
							/>)}
						</SelectGroup>

						{ctx.data.media.length === 0 && <h2 className="MediaPage-NoMedia">No media found.</h2>}
					</section>

					{this.state.viewed !== undefined && <Modal onClose={this.handleCloseMedia}>
						<MediaView item={ctx.data.media![this.state.viewed]}/>
					</Modal>}

					{this.state.uploading && <Modal>
						<MediaUploadForm onCancel={this.handleUploadCancel}/>
					</Modal>}
				</div>
			}</AppContext.Consumer>
		);
	}

	private handleKeyUp(e: KeyboardEvent): void {
		if (e.key === 'Delete') this.handleDeleteMedia();
	}

	private handleViewToggle(): void {
		this.setState({grid: !this.state.grid});
	}

	private handleOpenMedia(ind: number): void {
		this.setState({ viewed: ind });
	}

	private handleCloseMedia(): void {
		this.setState({ viewed: undefined });
	}

	private handleUploadCancel(): void {
		this.setState({ uploading: false });
	}

	private handleUploadMedia(): void {
		this.handleSelectionChange([]);
		this.setState({ uploading: true });
	}

	private handleDeleteMedia(): void {
		if (this.state.selected.length === 0) return;
		
		fetch('/admin/media/delete', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state.selected.map(ind => this.context.data.media[ind].identifier))
		}).then(r => r.json()).then(res => {
			this.context.handleSiteData(res);
		});
	}

	private handleSelectionChange(selected: number[]): void {
		this.setState({ selected: selected });
	}
}

MediaPage.contextType = AppContext;
