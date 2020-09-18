import * as Preact from 'preact';

import './ElementPropArray.sass';

import * as Element from '../../common/interface/Element';

interface Props {
	identifier: string;
	prop: Element.ArrayProp;

	value: any;
	onChange: (val: any) => void;
}

export default class ElementPropArray extends Preact.Component<Props, {}> {
	render() {
		const friendlyName = this.props.prop.name ||
			this.props.identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');

		return (
			<label key={this.props.identifier} className="ElementPropArray">
				<span className="ElementPropArray-Label">{friendlyName}</span>
				<span className="ElementPropArray-Disclaimer">
					Array properties can't be edited by the built-in component editor.
					Please use a custom management component until this is resolved.
				</span>
			</label>
		);
	}
}
