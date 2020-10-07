import * as Preact from 'preact';

import './ElementPropsEditor.sass';

import * as Element from '../../../../common/interface/Element';

interface Props {
	props: Element.PropsTable;
	values: any;
	setProps: (object: any) => void;
}

export default class ElementPropsEditor extends Preact.Component<Props, {}> {
	render() {
		return this.renderPropsTable(this.props.props, this.props.values, '');
	}
	
}
