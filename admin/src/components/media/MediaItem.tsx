import * as Preact from 'preact';

import './MediaItem.sass';

import MediaIcon from './MediaIcon';
import Selectable from '../Selectable';
import { ClickHandlerCallbacks } from '../../ClickHandler';

import * as Format from '../../../../common/util/Format';
import { Media } from '../../../../common/interface/DBStructs';

interface Props {
	item: Media;
	ind: number;

	onClick: (_: any) => void;
}

export default class MediaItem extends Preact.Component<Props, {}> {
	callbacks: ClickHandlerCallbacks;

	constructor(props: Props) {
		super(props);

		this.callbacks = {
			onDoubleClick: this.props.onClick
		};
	}

	render() {
		return (
			<li class='MediaItem'>
				<Selectable class='MediaItem-Select' ind={this.props.ind} callbacks={this.callbacks} doubleClickSelects={true}>
					<MediaIcon path={this.props.item.publicPath} />
					<div class='MediaItem-Description'>
						<p class='MediaItem-Title'>{this.props.item.name}</p>
						<p class='MediaItem-Author'>{`Uploaded by ${this.props.item.uploadUser} ${Format.date(this.props.item.uploadDate)}.`}</p>
						<p class='MediaItem-Size'>{
							(this.props.item.dimensions ? Format.vector(this.props.item.dimensions, 'px') + ' • ' : '')
							+ Format.bytes(this.props.item.size)
						}</p>
					</div>
				</Selectable>
			</li>
		);
	}
}
