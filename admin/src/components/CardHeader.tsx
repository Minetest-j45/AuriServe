import * as Preact from 'preact';

import './CardHeader.sass';

interface Props {
	icon: string;
	title: string;
	subtitle?: string;
}
export default class CardHeader extends Preact.Component<Props, {}> {
	render() {
		return (
			<div class='CardHeader'>
				<img class='CardHeader-Icon' src={this.props.icon} alt=''/>
				<div class='CardHeader-Content'>
					<h1 class='CardHeader-Title'>{this.props.title}</h1>
					<p class='CardHeader-Description'>{this.props.subtitle ?? ''}</p>
				</div>
			</div>
		);
	}
}
