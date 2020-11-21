import * as Preact from 'preact';

import './ElementPropInput.sass';

import * as Input from '../input/Input';
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
	value: any;

	setValue: (newValue: any) => any;
}


/**
 * A date/time input widget.
 * Can display just date, or just time, depending on the 'mode' prop.
 */

function DateTimeInput(props: WidgetProps & { mode?: 'date' | 'time' | 'datetime'}) {
	return (
		<input
			type={props.mode ?? 'datetime'}
			value={props.value}
			
			onChange={(e: any) => props.setValue(e.target.value)}
			onInput={(e: any) => props.setValue(e.target.value)}
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
			value={props.value}

			onChange={(e: any) => props.setValue(e.target.value)}
			onInput={(e: any) => props.setValue(e.target.value)}
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
			onChange={props.setValue}>
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

	const widgetProps: WidgetProps = {
		value: props.value,
		setValue: props.onChange
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
					return <Input.Text {...widgetProps} />;
				
				case 'long_text':
					return <Input.Text {...widgetProps} long={true} />;
				
				case 'html':
					return <Input.Text {...widgetProps} long={true} code={true} />;

				case 'number':
					return <Input.Numeric {...widgetProps} />;

				case 'date':
				case 'time':
				case 'datetime':
					return <DateTimeInput {...widgetProps} mode={baseType} />;

				case 'boolean':
					return <Input.Checkbox {...widgetProps} />;

				case 'color':
					return <ColorInput {...widgetProps} />;

				case 'enum':
					return <SelectInput {...widgetProps} values={currentType as string[]} />;
				}
			})()}
		</label>
	);
}
