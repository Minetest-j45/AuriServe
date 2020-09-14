import * as Preact from "preact";

import './ElementPropInput.sass';

import * as Element from "../../common/interface/Element";

interface Props {
	identifier: string;
	prop: Element.FieldProp;

	value: any;
	onChange: (val: any) => void;
}

interface State {
	type: Element.PropType;
}

export default class ElementPropInput extends Preact.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			type: this.props.prop.type.replace(/ /g, "").split("|")[0] as Element.PropType
		}

		this.handleChange = this.handleChange.bind(this);
	}

	private handleChange(evt: any) {
		let value: any = (evt.target as HTMLInputElement).value!;

		// Apply transformations to value based on type.
		
		let baseType = this.state.type.split(":")[0] as Element.BasePropType;
		switch (baseType) {

			case "number":
				value = (value == "" ? 0 : Number.parseInt(value));
				if (Number.isNaN(value)) value = this.props.value;
				break;

			case "boolean":
				value = !this.props.value;
				break;
		}
		
		this.props.onChange(value);
	}

	render() {
		const friendlyName = this.props.prop.name || 
			this.props.identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');

		let widget: Preact.VNode | undefined = undefined;

		let baseType = this.state.type.split(":")[0] as Element.BasePropType;
		switch (baseType) {

			default:
			case "text":
				widget = <input type="text" name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "long_text":
				widget = <textarea rows={1} name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "number":
				widget = <input type="number" name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "date":
				widget = <input type="date" name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "time":
				widget = <input type="time" name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "datetime":
				widget = <input type="datetime" name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "boolean":
				widget = <input type="checkbox" name={this.props.identifier} 
					checked={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;

			case "color":
				widget = <input type="color" name={this.props.identifier} 
					value={this.props.value} onChange={this.handleChange} onInput={this.handleChange} />
				break;
		}

		return (
			<label key={this.props.identifier} className="ElementPropInput">
				<span className="ElementPropInput-Label">{friendlyName}</span>
				{widget}
			</label>
		);
	}
}
