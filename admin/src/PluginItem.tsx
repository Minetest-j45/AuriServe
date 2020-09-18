import * as Preact from 'preact';

import './PluginItem.scss';

import Selectable from './Selectable';
import { ClickHandlerCallbacks } from './ClickHandler';

import { Plugin } from '../../common/interface/DBStructs';

interface Props {
	item: Plugin;
	ind: number;
	active: boolean;

	onClick: (_: MouseEvent) => void;
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
			<Selectable class="PluginItem" ind={this.props.ind} callbacks={this.callbacks} doubleClickSelects={true}>
				<div class="PluginItem-Cover">
					{this.props.item.hasCover && <img src={'/admin/plugins/cover/' + this.props.item.identifier + '.jpg'}/>}
					<span class={'PluginItem-Tag ' + (this.props.active ? 'Enabled' : 'Disabled')}>{this.props.active ? 'Enabled' : 'Disabled'}</span>
				</div>

				<div class="PluginItem-Content">
					<h2 class="PluginItem-Title">{this.props.item.name}</h2>
					<p class="PluginItem-Author">{this.props.item.author}</p>
					{this.props.item.description && <p class="PluginItem-Description">{this.props.item.description}</p>}
				</div>
			</Selectable>
		);
	}
}
