import * as Preact from 'preact';

import './MediaView.scss';

import { Media } from '../../../common/interface/DBStructs';

interface Props {
	item: Media;
}

export default class MediaView extends Preact.Component<Props, {}> {
	render() {
		return (<div className="MediaView">
			<img src={this.props.item.publicPath} />
		</div>);
	}
}
