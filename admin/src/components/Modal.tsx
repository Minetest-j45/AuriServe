import * as Preact from 'preact';
import { useEffect } from 'preact/hooks';

import './Modal.sass';

interface Props {
	onClose?: (_: MouseEvent) => void;
	children?: Preact.VNode | Preact.VNode[];

	class?: string;
	style?: any;
}

export default function Modal(props: Props) {
	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		body.style.overflow = 'hidden';
		return () => body.style.overflow = '';
	}, []);

	return (
		<div style={props.style} onClick={props.onClose}
			class={('Modal ' + (props.class ?? '')).trim() + (props.onClose ? ' closes' : '')}>
			<div class="Modal-CardWrap">
				<div class="Modal-Card" onClick={e => e.stopPropagation()}>
					{props.children}
				</div>
			</div>
		</div>
	);
}
