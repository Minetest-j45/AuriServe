import * as Preact from 'preact';
import { Link } from 'react-router-dom';
import { createPortal } from 'preact/compat';
import { CSSTransition } from 'preact-transitioning';

import './UserCard.sass';

import { AppContext } from '../AppContext';

import { User } from '../../../common/interface/DBStructs';

interface Props {
	visible: boolean;
	parent: HTMLElement;
	identifier: string;

	onClose: () => void;
}

interface State {
	user?: User;
}

export default class UserCard extends Preact.Component<Props, State> {
	ref: Preact.RefObject<HTMLDivElement>;

	constructor(p: Props) {
		super(p);

		this.ref = Preact.createRef();
	}

	componentDidMount() {
		this.setState({ user: this.context.data.users.filter((u: User) => u.identifier === this.props.identifier)[0] });

		document.getElementsByTagName('body')[0].addEventListener('mouseup', this.closeCallback);
		document.getElementsByTagName('body')[0].addEventListener('touchend', this.closeCallback);
	}

	componentWillUnmount() {
		document.getElementsByTagName('body')[0].removeEventListener('mouseup', this.closeCallback);
		document.getElementsByTagName('body')[0].removeEventListener('touchend', this.closeCallback);
	}

	render(props: Props) {
		return createPortal(
			<div>
				<CSSTransition in={this.props.visible} duration={150} classNames='Animate'>
					<div class='UserCard'>
						<div class='UserCard-Card' ref={this.ref} style={{
							top: props.parent.getBoundingClientRect().bottom + 'px',
							left: ((props.parent.getBoundingClientRect().left +
								props.parent.getBoundingClientRect().right) / 2) + 'px'}}>

							<div class='UserCard-Header'>
								<img src='/admin/asset/icon/user-color.svg' />
								<h1 class='UserCard-Name' title={this.state.user?.name}>{this.state.user?.name}</h1>
								<h2 class='UserCard-Identifier' title={'@' + this.props.identifier}>
									<span class='UserCard-At'>@</span>{this.props.identifier}</h2>
							</div>
							<div class='UserCard-Body'>
								<Link to={'/users/' + this.props.identifier} className='UserCard-Full'>View Profile</Link>
							</div>
						</div>
					</div>
				</CSSTransition>
			</div>,
			document.getElementsByTagName('body')[0]
		);
	}

	closeCallback = (e: MouseEvent | TouchEvent) => {
		if (!this.props.visible) return;

		let x = e.target as HTMLElement;

		while (x) {
			if (x === this.ref.current) return;
			x = x.parentNode as HTMLElement;
		}

		this.props.onClose();
	};
}

UserCard.contextType = AppContext;
