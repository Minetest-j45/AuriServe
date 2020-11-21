import * as Preact from 'preact';
import { Helmet } from 'react-helmet';

interface Props {
	children: string;
}

export default function Title({ children: title }: Props) {
	return (
		<Helmet>
			<title>{`${title}  •  AuriServe`}</title>
		</Helmet>
	);
}
