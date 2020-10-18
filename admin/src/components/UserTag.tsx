import * as Preact from 'preact';

import UserCard from './UserCard';

import './UserTag.sass';

interface Props {
	identifier: string;
}

interface State {
	active: boolean;
}

export default class UserTag extends Preact.Component<Props, State> {
	ref: Preact.RefObject<HTMLButtonElement>;

	constructor(p: Props) {
		super(p);
		this.state = { active: false };
		this.ref = Preact.createRef();
	}

	componentDidMount() {
		this.forceUpdate();
	}

	render() {
		return (
			<Preact.Fragment>
				<button class="UserTag" ref={this.ref} onClick={this.handleToggleModal}>
					<span class="UserTag-At">@</span>{this.props.identifier}
				</button>
				{this.ref.current && <UserCard
					visible={this.state.active}
					parent={this.ref.current!}
					identifier={this.props.identifier}
					onClose={this.handleCloseModal}/>
				}
			</Preact.Fragment>
		);
	}

	handleCloseModal = () => {
		setTimeout(() => this.setState({ active: false }), 1);
	};

	handleToggleModal = () => {
		this.setState({ active: !this.state.active });
	};
}
