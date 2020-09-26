import * as Preact from 'preact';

import './MediaUploadForm.scss';

import CardHeader from './CardHeader';
import SelectGroup from './SelectGroup';
import MediaUploadItem from './MediaUploadItem';
import DimensionTransition from './DimensionTransition';

import { AppContext } from './AppContext';

enum MediaUploadState {
	SELECTING,
	UPLOADING,
	COMPLETED
}

export interface UploadItemData {
	file: File;
	ext: string;

	name: string;
	identifier: string;

	thumbnail?: string;
}

interface Props {
	onCancel: () => void;
}

interface State {
	state: MediaUploadState;

	files: UploadItemData[];
	selected: number[];

	grid: boolean;
}

export default class MediaUploadForm extends Preact.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			state: MediaUploadState.SELECTING,
			files: [],
			selected: [],
			grid: false
		};

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleViewToggle = this.handleViewToggle.bind(this);
		this.handleRemoveFiles = this.handleRemoveFiles.bind(this);
		this.handleFilesChange = this.handleFilesChange.bind(this);
		this.handleFilenameChange = this.handleFilenameChange.bind(this);
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keyup', this.handleKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeyUp);
	}

	render() {
		const uploadItems: Preact.VNode[] = this.state.files.map((f, i) => <MediaUploadItem
			file={f} ind={i} key={f.file.name} editable={this.state.state === MediaUploadState.SELECTING}
			onNameChange={this.handleNameChange.bind(this, i)} onFilenameChange={this.handleFilenameChange.bind(this, i)}/>);

		return <AppContext.Consumer>{ctx =>
			<form className="MediaUploadForm" onSubmit={(e) => e.preventDefault()}>
				<CardHeader icon="/admin/asset/icon/document-dark.svg" title="Upload Media"
					subtitle={`Upload new media assets to ${ctx.data.sitename}.`} />

				<div className={'MediaUploadForm-InputWrap' + (this.state.state !== MediaUploadState.SELECTING ? ' disabled' : '')}>
					<input type="file" multiple autoFocus
						className="MediaUploadForm-Input"
						onChange={this.handleFilesChange}
						disabled={this.state.state !== MediaUploadState.SELECTING} />
					<h2>Click or drag files here to upload.</h2>
				</div>

				{this.state.files.length > 0 && <div className="MediaUploadForm-Toolbar">
					<div>
						{this.state.selected.length > 0 && <button className="MediaUploadForm-Toolbar-Button" onClick={this.handleRemoveFiles}>
							<img src="/admin/asset/icon/trash-dark.svg"/>
							<span>{this.state.selected.length === 1 ? 'Remove' : 'Remove (' + this.state.selected.length + ')'}</span>
						</button>}
					</div>
					<div>
						<button className="MediaUploadForm-Toolbar-Button">
							<img src="/admin/asset/icon/sort-dark.svg"/><span>Sort by Size</span>
						</button>

						<button className="MediaUploadForm-Toolbar-Button" onClick={this.handleViewToggle}>
							<img src={`/admin/asset/icon/${this.state.grid ? 'grid' : 'list'}-view-dark.svg`}/>
						</button>
					</div>
				</div>}

				<DimensionTransition duration={150}>
					{this.state.state === MediaUploadState.SELECTING && <SelectGroup
						className={'MediaUploadForm-Files ' + (this.state.grid ? 'Grid' : 'Stack')}
						onSelectionChange={this.handleSelectionChange} multi={true}>
						{uploadItems}
					</SelectGroup>}

					{this.state.state === MediaUploadState.UPLOADING &&
					<div className={'MediaUploadForm-Files ' + (this.state.grid ? 'Grid' : 'Stack')}>
						{uploadItems}
					</div>}
				</DimensionTransition>

				<div className="MediaUploadForm-ActionBar">
					<div>
						<button
							onClick={this.handleClose}
							className="MediaUploadForm-ActionBar-Button"
							disabled={this.state.state === MediaUploadState.UPLOADING}>
							Cancel
						</button>
					</div>
					<div>
						{this.state.files.length > 0 && <button
							onClick={this.handleUpload}
							className="MediaUploadForm-ActionBar-Button Upload"
							disabled={this.state.state === MediaUploadState.UPLOADING}>
							{`Upload File${this.state.files.length > 1 ? 's' : ''}`}
						</button>}
					</div>
				</div>
			</form>
		}</AppContext.Consumer>;
	}

	private handleKeyUp(e: KeyboardEvent): void {
		if (e.key === 'Delete') this.handleRemoveFiles();
	}

	private handleViewToggle() {
		this.setState({ grid: !this.state.grid });
	}

	private handleRemoveFiles(): void {
		let files = [...this.state.files];
		for (let i = this.state.selected.length - 1; i >= 0; i--) {
			let ind = this.state.selected[i];
			files.splice(ind, 1);
		}
		this.setState({files: files});
	}

	private handleNameChange(ind: number, name: string) {
		let files = [...this.state.files];
		let file = Object.assign(files[ind]);
		file.name = name;
		files[ind] = file;
		this.setState({files: files});
	}

	private handleFilenameChange(ind: number, name: string) {
		const cleanName = name.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

		let files = [...this.state.files];
		let file = Object.assign(files[ind]);
		file.identifier = cleanName;
		files[ind] = file;
		this.setState({files: files});
	}

	private handleClose(e: any) {
		e.preventDefault();
		this.props.onCancel();
	}

	private handleUpload() {
		this.setState({state: MediaUploadState.UPLOADING, selected: []});
		this.handleSubmit();
	}

	private handleSelectionChange(selected: number[]): void {
		this.setState({ selected: selected });
	}

	private handleSubmit(): void {
		const threads = 6;

		let promises = [];
		for (let i = 0; i < threads; i++) {
			let ind = i;

			promises.push(new Promise((resolve) => {
				const f = () => {
					if (ind >= this.state.files.length) return resolve();
					const file = this.state.files[ind];

					let data = new FormData();
					data.append('file', file.file);
					data.append('name', file.name);
					data.append('identifier', file.identifier);

					fetch('/admin/media/upload', {
						method: 'POST',
						cache: 'no-cache',
			    	// headers: {'Content-Type': 'application/json'},
						body: data
					}).then(() => {
						ind += threads;
						f();
					});
				};
				f();
			}));
		}
		
		Promise.all(promises).then(() => {
			fetch('/admin/data/media', {
				cache: 'no-cache'
			}).then(r => r.json()).then(res => {
				this.context.handleSiteData(res);
				this.props.onCancel();
			});
		});
	}

	private async handleFilesChange(e: any) {
		let target = e.target as HTMLInputElement;
		let files = [...this.state.files];
		let newFiles = Array.from(target.files || []);
		target.value = '';

		await Promise.all(newFiles.map(file => new Promise((resolve) => {
			const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
			const isImage = ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'svg' || ext === 'gif';

			// @ts-ignore
			let cleanName = file.name.substr(0, file.name.lastIndexOf('.')).replace(/[_-]+/g, ' ').split(' ').map(([firstChar, ...rest]) =>
				firstChar.toUpperCase() + rest.join('').toLowerCase()).join(' ');
			if (cleanName.length > 32) cleanName = cleanName.substr(0, 32);

			let resolveFile = (image?: string) => {

				let exists = false;
				for (let existingFile of files) {
					if (existingFile.name === cleanName) {
						exists = true;
						break;
					}
				}
				
				if (!exists) {
					files.push({
						file: file,
						ext: ext,
						name: cleanName,
						identifier: '',
						thumbnail: image
					});
				}

				resolve();
			};

			if (isImage) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolveFile(reader.result as string);
			} else resolveFile();
		})));
		
		this.setState({files: files});
	}
}

MediaUploadForm.contextType = AppContext;
