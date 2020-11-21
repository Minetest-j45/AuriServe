import * as Preact from 'preact';

import './InputLabel.sass';

interface Props {
	label: string;

	children?: Preact.ComponentChildren;
}

export default function InputLabel(props: Props) {
	return (
		<label class='InputLabel'>
			<p class='InputLabel-Label'>{props.label}</p>
			{props.children}
		</label>
	);
}
