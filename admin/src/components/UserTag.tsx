import * as Preact from 'preact';
import { useState, useRef } from 'preact/hooks';
import { useImmediateRerender } from '../Hooks';

import UserCard from './UserCard';

import './UserTag.sass';

interface Props {
	identifier: string;
}

export default function UserTag(props: Props) {
	const ref = useRef(null);
	useImmediateRerender();

	const [ active, setActive ] = useState<boolean>(false);

	return (
		<button class="UserTag" ref={ref}
			onClick={() => setActive(true)}>
			@{props.identifier}

			{ref.current && <UserCard
				visible={active}
				parent={ref.current!}
				identifier={props.identifier}
				onClose={() => setTimeout(() => setActive(false), 0)}/>
			}
		</button>
	);
}
