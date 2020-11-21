import * as Preact from 'preact';

import './InputNumeric.sass';

import { WidgetProps as Props } from '../Input';


/**
 * A numberic input widget.
 */

export default function InputNumeric(props: Props) {
	const cb = (evt: any) => props.setValue(evt.target.value);

	return (
		<input
			value={props.value}
			onInput={cb}
			onChange={cb}
			
			class={('InputNumeric ' + (props.class ?? '')).trim()}
			style={props.style}

			type='number'
			disabled={props.disabled}
			placeholder={props.placeholder}
		/>
	);
}
