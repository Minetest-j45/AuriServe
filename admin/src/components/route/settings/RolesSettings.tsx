import * as Preact from 'preact';
import { useSiteData } from '../../../Hooks';

import RolesEditor from '../../roles/RolesEditor';

export default function RolesSettings() {
	const [ { roles } ] = useSiteData([ 'roles' ]);

	return (
		<div class='Settings RolesSettings'>
			{roles && <RolesEditor roles={roles} />}
		</div>
	);
}
