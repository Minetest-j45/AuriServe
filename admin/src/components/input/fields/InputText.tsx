import * as Preact from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';

import './InputText.sass';

import { WidgetProps as Props } from '../Input';

/**
 * Automatically scales a HTML TextArea element to the height of its content,
 * or the specified max-height, whichever is smaller. Returns a ref to attach to
 * the TextArea which should be scaled.
 *
 * @param {number} maxHeight - An optional maximum height, defaults to Infinity.
 * @param {any[]} dependents - A list of dependent variables for the TextArea's content.
 * @return {RefObject} - A RefObject to attach to the targeted TextArea.
 */

function useAutoTextArea(maxHeight?: number, dependents?: any[]): Preact.RefObject<HTMLTextAreaElement> {
	const ref = useRef<HTMLTextAreaElement>(null);

	useLayoutEffect(() => {
		if (!ref.current) return;
		ref.current.style.height = '';
		ref.current.style.height = Math.min(ref.current.scrollHeight + 2, maxHeight ?? Infinity) + 'px';
	}, [ ref.current, ...dependents || [] ]);

	return ref;
}

/**
 * A line text input widget, either a single-line input form
 * or an autoscaling textarea depending on a prop.
 */

export default function InputText(props: Props & { long?: boolean; code?: boolean; maxHeight?: number }) {
	const ref = useAutoTextArea(props.maxHeight ?? 420, [ props.value ]);
	
	const cb = (evt: any) => props.setValue(evt.target.value);
	const sharedProps = {
		value: props.value,
		onInput: cb,
		onChange: cb
	};

	return (
		props.long ?
			<textarea
				{...sharedProps}
				
				class={('InputText Long ' + (props.class ?? '') + (props.code ? ' Code' : '')).trim()}
				style={props.style}

				rows={1}
				ref={ref as any}
				disabled={props.disabled}
				placeholder={props.placeholder}/>
			:
			<input
				{...sharedProps}
				
				class={('InputText Short ' + (props.class ?? '') + (props.code ? ' Code' : '')).trim()}
				style={props.style}

				type='text'
				disabled={props.disabled}
				placeholder={props.placeholder} />
	);
}
