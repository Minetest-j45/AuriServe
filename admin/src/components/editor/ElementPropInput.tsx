import * as Preact from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';

import './ElementPropInput.sass';

import * as Element from '../../../../common/interface/Element';


/**
 * Properties for the base ElementPropInput element.
 */

interface Props {
	identifier: string;
	prop: Element.FieldProp;
	value: any;

	onChange: (newValue: any) => void;
}


/**
 * Default properties used by all input widgets.
 * May be extended by certain widgets.
 */

interface WidgetProps {
	identifier: string;
	value: any;

	onChange: (newValue: any) => any;
}


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
 * A single-line text input widget.
 * Horizontally scrolls when the content becomes longer than its width.
 */

function TextInput(props: WidgetProps) {
	return (
		<input
			type='text'
			name={props.identifier}
			value={props.value}
			
			onChange={props.onChange}
			onInput={props.onChange}
		/>
	);
}


/**
 * A multiline text input widget,
 * that automatically scales to the content inside.
 */

function LongTextInput(props: WidgetProps) {
	const ref = useAutoTextArea(420, [ props.value ]);

	return (
		<textarea
			ref={ref as any}
			name={props.identifier}
			value={props.value}

			rows={1}
			  
			onChange={props.onChange}
			onInput={props.onChange}
		/>
	);
}


/**
 * A multiline 'code' input widget,
 * that automatically scales to the content inside.
 * Content is rendered in monospace.
 */

function LongCodeInput(props: WidgetProps) {
	const ref = useAutoTextArea(420, [ props.value ]);

	return (
		<textarea
			ref={ref as any}
			class='ElementPropInput-Code'
			
			name={props.identifier}
			value={props.value}

			rows={1}
			  
			onChange={props.onChange}
			onInput={props.onChange}
		/>
	);
}


/**
 * A numeric input widget.
 */

function NumberInput(props: WidgetProps) {
	return (
		<input
			type='number'
			name={props.identifier}
			value={props.value}
			
			onChange={props.onChange}
			onInput={props.onChange}
		/>
	);
}


/**
 * A date/time input widget.
 * Can display just date, or just time, depending on the 'mode' prop.
 */

function DateTimeInput(props: WidgetProps & { mode?: 'date' | 'time' | 'datetime'}) {
	return (
		<input
			type={props.mode ?? 'datetime'}
			name={props.identifier}
			value={props.value}
			
			onChange={props.onChange}
			onInput={props.onChange}
		/>
	);
}


/**
 * A two-state checkbox input widget.
 */

function CheckboxInput(props: WidgetProps) {
	return (
		<input
			type='checkbox'
			name={props.identifier}
			checked={props.value}

			onChange={props.onChange}
		/>
	);
}

/**
 * A color selector input widget.
 */

function ColorInput(props: WidgetProps) {
	return (
		<input
			type='color'
			name={props.identifier}
			value={props.value}

			onChange={props.onChange}
			onInput={props.onChange}
		/>
	);
}

/**
 * A select input widget.
 * Provides the choice of multiple enum values specified by the `values` prop.
 */

function SelectInput(props: WidgetProps & { values: string[] }) {
	return (
		<select
			name={props.identifier}
			onChange={props.onChange}>
			{props.values.map(v => {
				const title = v.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');
				return <option selected={props.value === v} value={v}>{title}</option>;
			})}
		</select>
	);
}


/**
 * Main Input Element, determines the type of the property,
 * and renders the appropriate Input wrapped in a label.
 */

export default function ElementPropInput(props: Props) {
	const types = (Array.isArray(props.prop.type) ? props.prop.type : [props.prop.type]) as Element.PropType[];
	const currentType = types[0];
	const baseType = (Array.isArray(currentType) ? 'enum' : (types[0] as string).split(':')[0]) as Element.PropType | 'enum';

	const displayName = props.prop.name ||
		props.identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');

	const handleChange = (evt: any) => {
		let value: any = (evt.target as HTMLInputElement).value!;

		// Apply transformations to value based on type.

		switch (baseType) {
		default: break;
		
		case 'number':
			value = (value === '' ? 0 : Number.parseInt(value, 10));
			if (Number.isNaN(value)) value = props.value;
			break;

		case 'boolean':
			value = !props.value;
			break;
		}
		
		props.onChange(value);
	};

	const widgetProps: WidgetProps = {
		identifier: props.identifier,
		value: props.value,

		onChange: handleChange
	};

	return (
		<label key={props.identifier} className='ElementPropInput'>
			<span class='ElementPropInput-Label'>{displayName}</span>
			{(() => {
				switch (baseType) {
				default:
					console.error(`Unhandled baseType '${baseType}'`);
					// fall through

				case 'text':
					return <TextInput {...widgetProps} />;
				
				case 'long_text':
					return <LongTextInput {...widgetProps} />;
				
				case 'html':
					return <LongCodeInput {...widgetProps} />;

				case 'number':
					return <NumberInput {...widgetProps} />;

				case 'date':
				case 'time':
				case 'datetime':
					return <DateTimeInput {...widgetProps} mode={baseType} />;

				case 'boolean':
					return <CheckboxInput {...widgetProps} />;

				case 'color':
					return <ColorInput {...widgetProps} />;

				case 'enum':
					return <SelectInput {...widgetProps} values={currentType as string[]} />;
				}
			})()}
		</label>
	);
}
