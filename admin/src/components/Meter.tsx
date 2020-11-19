import * as Preact from 'preact';

import './Meter.scss';

interface Props {
	size: number;
	usage: number;
}

export default function Meter(props: Props) {
	return (
		<div className="Meter">
			<div className="Meter-Progress" style={{ width: ((props.usage / props.size) * 100) + '%' }}/>
		</div>
	);
}
