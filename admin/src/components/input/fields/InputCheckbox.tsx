import * as Preact from 'preact';

import './InputCheckbox.sass';

import { WidgetProps as Props } from '../Input';


/**
 * A two-state checkbox input widget.
 */

export default function InputCheckbox(props: Props) {
	const cb = () => props.setValue(!props.value);
	
	return (
		<input
			class={('InputCheckbox ' + (props.class ?? '')).trim()}
			style={props.style}

			checked={props.value}
			onChange={cb}

			type='checkbox'
		/>
	);
}
