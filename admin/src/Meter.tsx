import * as React from 'react';

import './Meter.scss';

interface Props {
	size: number;
	usage: number;
}

export default class Meter extends React.PureComponent<Props, {}> {
	render() {
		return (<div className="Meter">
			<div className="Meter-Progress" style={{width: ((this.props.usage / this.props.size) * 100) + "%"}}/>
		</div>);
	}
}
