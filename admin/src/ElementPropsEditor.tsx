import * as Preact from 'preact';

import './ElementPropsEditor.sass';

import ElementPropInput from './ElementPropInput';
import ElementPropArray from './ElementPropArray';

import * as Element from '../../common/interface/Element';

interface Props {
	props: Element.PropsTable;
	values: any;
	updateValue: (path: string, value: any) => void;
}

export default class ElementPropsEditor extends Preact.Component<Props, {}> {
	render() {
		return this.renderPropsTable(this.props.props, this.props.values, '');
	}
	
	private renderProp(identifier: string, p: Element.Prop, values: any, fullIdentifier: string) {
		let widget: React.ReactNode | undefined;
		
		if ('fields' in p) {
			const prop = p as Element.TableProp;
			const friendlyName = prop.name || identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');
			
			widget = <label key={fullIdentifier + '-LABEL'} className="ElementPropsEditor-WrapLabel">
				<span>{friendlyName}</span>
				<div key={fullIdentifier} className="ElementPropsEditor-TableWrap">
					{this.renderPropsTable(prop.fields, values[identifier], fullIdentifier)}
				</div>
			</label>;
		} else if ('entries' in p) {
			const prop = p as Element.ArrayProp;
			widget = <ElementPropArray
				prop={prop}
				key={fullIdentifier}
				identifier={identifier}
				value={values[identifier]}
				onChange={this.props.updateValue.bind(this, fullIdentifier)} />;
		} else {
			const prop = p as Element.FieldProp;
			widget = <ElementPropInput
				prop={prop}
				key={fullIdentifier}
				identifier={identifier}
				value={values[identifier]}
				onChange={this.props.updateValue.bind(this, fullIdentifier)} />;
		}

		return widget;
	}

	private renderPropsTable(props: Element.PropsTable, values: any, fullIdentifier: string) {
		return <div className="ElementPropsEditor-Table">
			{Object.entries(props).map(([k, v]) => this.renderProp(k, v, values, fullIdentifier + (fullIdentifier !== '' ? '.' : '') + k))}
		</div>;
	}
}
