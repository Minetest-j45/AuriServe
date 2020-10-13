import * as Preact from 'preact';

import "./ElementEditor.sass";

import { AppContext } from '../AppContext';

import ElementPropInput from './ElementPropInput';
import ElementPropArray from './ElementPropArray';

import * as Element from '../../../../common/interface/Element';
import { Element as PageElement } from '../../../../common/interface/Page';

interface Props {
	element: PageElement;

	onCancel: () => void;
	onSave: (props: any) => void;
}

interface State {
	props: any;
}

export default class ElementEditor extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);

		this.state = {
			// Deep copy using JSON is safe, because page data is already JSON.
			props: JSON.parse(JSON.stringify(p.element.props)) 
		};
	}

	render() {
		const EditElement = this.context.plugins.elements.get(this.props.element.elem)?.editElement;
		const defs = !EditElement && this.context.data.elementDefs[this.props.element.elem];
		
		return (
			<div class={"ElementEditor " + (EditElement ? "Custom" : "Automatic")}>
				{EditElement && <EditElement props={this.state.props} setProps={this.handleSetProps} />}
				{!EditElement && this.renderPropsTable(defs.props, this.state.props, "")}

				<div className="ElementEditor-ActionBar">
					<button onClick={this.handleSave}>Confirm</button>
					<button onClick={this.handleCancel}>Cancel</button>
				</div>
			</div>
		);
	}

	private renderPropsTable(props: Element.PropsTable, values: any, fullIdentifier: string) {
		return (
			<div className="ElementEditor-PropsTable">
				{Object.entries(props).map(([k, v]) => this.renderProp(k, v, values, fullIdentifier + (fullIdentifier !== '' ? '.' : '') + k))}
			</div>
		);
	}

	private renderProp(identifier: string, p: Element.Prop, values: any, fullIdentifier: string) {
		// Table
		if ('fields' in p) {
			const friendlyName = p.name || identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');
			
			return (
				<label key={fullIdentifier + '-LABEL'} className="ElementEditor-TableWrap">
					<span>{friendlyName}</span>
					{this.renderPropsTable(p.fields, values[identifier], fullIdentifier)}
				</label>
			);
		}
		// Array
		else if ('entries' in p) {
			return (
				<ElementPropArray
					prop={p as Element.ArrayProp}
					key={fullIdentifier}
					identifier={identifier}
					value={values[identifier]}
					onChange={this.handleSetProps} 
				/>
			);
		}
		// Field
		else {
			return (
				<ElementPropInput
					prop={p as Element.FieldProp}
					key={fullIdentifier}
					identifier={identifier}
					value={values[identifier]}
					setProps={this.handleSetProps} 
				/>
			);
		}
	}

	private handleSetProps = (object: any) => {
		const props = Object.assign({}, this.state.props, object);
		this.setState({ props: props });
	};

	private handleCancel = () => {
		this.props.onCancel();
	};

	private handleSave = () => {
		this.props.onSave(this.state.props);
	};
}

ElementEditor.contextType = AppContext;
