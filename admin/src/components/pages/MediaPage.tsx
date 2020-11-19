import * as Preact from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSiteData } from '../../Hooks';

import './MediaPage.scss';

import Modal from '../Modal';
import CardHeader from '../CardHeader';
import SelectGroup from '../SelectGroup';
import MediaItem from '../media/MediaItem';
import MediaView from '../media/MediaView';
import MediaUploadForm from '../media/MediaUploadForm';

export default function MediaPage() {
	const [ data, , setData ] = useSiteData('media');

	const [ grid, setGrid ] = useState<boolean>(true);
	const [ selected, setSelected ] = useState<number[]>([]);

	const [ viewing, setViewing ] = useState<string | undefined>(undefined);
	const [ uploading, setUploading ] = useState<boolean>(false);

	const handleUploadMedia = () => {
		setSelected([]);
		setUploading(true);
	};

	const handleDelete = async (...identifiers: string[]) => {
		const r = await fetch('/admin/media/delete', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(identifiers)
		});
		const res = await r.json();
		setViewing(undefined);
		setData(res);
	};

	const handleDeleteSelection = () => {
		if (selected.length === 0) return;
		handleDelete(...selected.map(ind => (data.media || [])[ind].identifier));
	};

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === 'Delete') handleDeleteSelection();
		};

		window.addEventListener('keyup', handleKeyUp);
		return () => window.removeEventListener('keyup', handleKeyUp);
	}, [ handleDeleteSelection ]);

	return (
		<div class='Page MediaPage'>
			<section class='Page-Card'>
				<CardHeader icon='/admin/asset/icon/image-dark.svg' title='Manage Media'
					subtitle={'Create or remove user-uploaded media.'} />

				<div class='MediaPage-Toolbar'>
					<div>
						<button class='MediaPage-Toolbar-Button' onClick={handleUploadMedia}>
							<img src='/admin/asset/icon/add-dark.svg' alt=''/><span>Upload Media</span>
						</button>

						{selected.length > 0 && <button class='MediaPage-Toolbar-Button' onClick={handleDeleteSelection}>
							<img src='/admin/asset/icon/trash-dark.svg' alt=''/>
							<span>{selected.length === 1 ? 'Delete' : 'Delete (' + selected.length + ')'}</span>
						</button>}
					</div>
					<div>
						{/* <button class='MediaPage-Toolbar-Button' onClick={this.handleUploadMedia}>
							<img src='/admin/asset/icon/sort-dark.svg'/><span>Sort by Size</span>
						</button> */}

						<button class='MediaPage-Toolbar-Button'
							onClick={() => setGrid(!grid)} aria-label='Switch View' title='Switch View'>
							<img src={`/admin/asset/icon/${grid ? 'grid' : 'list'}-view-dark.svg`} alt=''/>
						</button>
					</div>
				</div>

				{data.media &&
					<SelectGroup
						multi={true}
						onSelectionChange={setSelected}
						className={'MediaPage-Media ' + (grid ? 'Grid' : 'Stack')}>
						{data.media.map((a: any, i: number) => <MediaItem
							ind={i}
							item={a}
							key={a.identifier}
							onClick={() => setViewing(a.identifier)}
						/>)}
					</SelectGroup>
				}

				{!data.media && <h2 class='MediaPage-Notice'>Loading media...</h2>}
				{data.media && data.media.length === 0 && <h2 class='MediaPage-Notice'>No media found.</h2>}
			</section>

			{viewing !== undefined &&
				<Modal onClose={() => setViewing(undefined)}>
					<MediaView onDelete={() => handleDelete(viewing)}
						item={data.media!.filter(m => m.identifier === viewing)[0]}/>
				</Modal>
			}

			{uploading && <Modal>
				<CardHeader icon='/admin/asset/icon/document-dark.svg' title='Upload Media'
					subtitle={`Upload new media assets to ${data.sitename}.`} />
				<MediaUploadForm onCancel={() => setUploading(false)}/>
			</Modal>}
		</div>
	);
}
