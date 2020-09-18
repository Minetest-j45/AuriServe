import * as Preact from 'preact';

import './ThemeItem.scss';

import Selectable from './Selectable';
import { ClickHandlerCallbacks } from './ClickHandler';

import { Theme } from '../../common/interface/DBStructs';

interface Props {
	item: Theme;
	ind: number;
	active: boolean;

	onClick: (_: MouseEvent) => void;
}

export default class MediaItem extends Preact.Component<Props> {
	callbacks: ClickHandlerCallbacks;

	constructor(props: Props) {
		super(props);

		this.callbacks = {
			onDoubleClick: this.props.onClick
		};
	}

	render() {
		return (
			<Selectable class="ThemeItem" ind={this.props.ind} callbacks={this.callbacks} doubleClickSelects={true}>
				<div class="ThemeItem-Cover">
					{this.props.item.hasCover && <img src={'/admin/themes/cover/' + this.props.item.identifier + '.jpg'}/>}
					<span class={'ThemeItem-Tag ' + (this.props.active ? 'Enabled' : 'Disabled')}>
						{this.props.active ? 'Enabled' : 'Disabled'}
					</span>
				</div>

				<div class="ThemeItem-Content">
					<h2 class="ThemeItem-Title">{this.props.item.name}</h2>
					<p class="ThemeItem-Author">{this.props.item.author}</p>
					{this.props.item.description && <p class="ThemeItem-Description">{this.props.item.description}</p>}
				</div>
			</Selectable>
		);
	}
}
