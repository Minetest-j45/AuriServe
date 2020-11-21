import * as Preact from 'preact';

import './ElementEditor.sass';

import ElementPropInput from './ElementPropInput';
import ElementPropArray from './ElementPropArray';

import { PluginElements } from '../../LoadPlugins';
import * as Element from '../../../../common/interface/Element';
import { Element as PageElement } from '../../../../common/interface/Page';

interface Props {
	defs: PluginElements;
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

		// Deep copy using JSON is safe, because page data is already JSON.
		this.state = { props: JSON.parse(JSON.stringify(p.element.props)) };
	}

	componentWillReceiveProps(props: Props) {
		// Deep copy using JSON is safe, because page data is already JSON.
		this.setState({ props: JSON.parse(JSON.stringify(props.element.props)) });
	}

	render() {
		const definition = this.props.defs[this.props.element.elem];
		if (!definition) return null;

		const propDefs = definition.config.props;
		const EditElement = definition?.editing?.propertyEditor;

		return (
			<div class={'ElementEditor ' + (EditElement ? 'Custom' : 'Automatic')}>
				{(EditElement && typeof EditElement != 'boolean' ?
					<EditElement props={this.state.props} setProps={this.handleSetProps} /> :
					this.renderPropsTable(propDefs, this.state.props, '')
				)}

				<div className='ElementEditor-ActionBar'>
					<button onClick={this.handleSave}>Confirm</button>
					<button onClick={this.handleCancel}>Cancel</button>
				</div>
			</div>
		);
	}

	private renderPropsTable(props: Element.PropsTable, values: any, fullIdentifier: string) {
		return (
			<div className='ElementEditor-PropsTable'>
				{Object.entries(props).map(([k, v]) => this.renderProp(k, v, values, fullIdentifier + (fullIdentifier !== '' ? '.' : '') + k))}
			</div>
		);
	}

	private renderProp(identifier: string, p: Element.Prop, values: any, fullIdentifier: string) {
		// Table
		if ('fields' in p) {
			const friendlyName = p.name || identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');

			return (
				<label key={fullIdentifier + '-LABEL'} className='ElementEditor-TableWrap'>
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
					onChange={this.handleSetProp.bind(this, identifier)}
				/>
			);
		}
	}

	private handleSetProp = (identifier: string, object: any) => {
		this.handleSetProps({ [identifier]: object });
	};

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
