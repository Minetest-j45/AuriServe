import * as Preact from 'preact';
import { useMemo } from 'preact/hooks';

import './MediaItem.sass';

import MediaIcon from './MediaIcon';
import Selectable from '../Selectable';
// import { ClickHandlerCallbacks } from '../../ClickHandler';

import * as Format from '../../../../common/util/Format';
import { Media } from '../../../../common/interface/DBStructs';

interface Props {
	item: Media;
	ind: number;

	onClick: (_: any) => void;
}

export default function MediaItem(props: Props) {
	const callbacks = useMemo(() => ({ onDoubleClick: props.onClick }), []);

	return (
		<li class='MediaItem'>
			<Selectable class='MediaItem-Select' ind={props.ind} callbacks={callbacks} doubleClickSelects={true}>
				<MediaIcon path={props.item.publicPath} />
				<div class='MediaItem-Description'>
					<p class='MediaItem-Title'>{props.item.name}</p>
					<p class='MediaItem-Author'>Uploaded by @{props.item.uploadUser} {Format.date(props.item.uploadDate)}.</p>
					<p class='MediaItem-Size'>{(props.item.dimensions && Format.vector(props.item.dimensions, 'px') + ' • ')}
						{Format.bytes(props.item.size)}</p>
				</div>
			</Selectable>
		</li>
	);
}
