import * as React from 'react';

import './MediaView.scss';

import { Media } from "../../common/interface/DBStructs";

interface Props {
	item: Media;
}

export default class MediaView extends React.PureComponent<Props, {}> {
	render() {
		return (<div className="MediaView">
			<img src={this.props.item.publicPath} />
		</div>);
	}
}
