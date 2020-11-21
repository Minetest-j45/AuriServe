import * as Preact from 'preact';
import { useSiteData } from '../../Hooks';

import './MainPage.scss';

import Meter from '../Meter';
import Title from '../Title';

export default function MainPage() {
	const [ data ] = useSiteData('info');

	return (
		<div className='MainPage'>
			<Title>Home</Title>
			<div className='MainPage-Header'>
				<h1>
					<img src='/admin/asset/icon/globe-dark.svg' alt=''/>
					{data.domain ?? '...'}
				</h1>
				<h2>{data.sitename ?? '...'}</h2>
			</div>
			<div className='MainPage-Content'>
				<aside>
					<div className='MainPage-MediaCard'>
						<Meter usage={data.mediaUsed ?? 0} size={data.mediaMax ?? 1} />
					</div>
				</aside>
				<main>
				</main>
			</div>
		</div>
	);
}
