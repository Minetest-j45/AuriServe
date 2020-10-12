import * as Preact from 'preact';

import './MediaView.sass';

import MediaIcon, { mediaIsImage } from './MediaIcon';

import * as Format from '../../../common/util/Format';
import { Media } from '../../../common/interface/DBStructs';

interface Props {
	item: Media;
}

export default class MediaView extends Preact.Component<Props, {}> {
	render(props: Props) {
		return (
			<div className="MediaView">
				<div class="MediaView-Top">
					<MediaIcon path={props.item.publicPath} imageIcon={false} />
					<div class="MediaView-Info">
						<h1 class="MediaView-Name">{props.item.name} <span class="MediaView-Path">( {props.item.publicPath} )</span></h1>
						<h2 class="MediaView-Author">{`Uploaded by ${props.item.uploadUser} ${Format.date(props.item.uploadDate)}.`}</h2>
						<h3 class="MediaView-Size">{Format.bytes(props.item.size)
							+ (props.item.dimensions ? ' • ' + Format.vector(props.item.dimensions, 'px') : '')}</h3>
					</div>
				</div>

				<div class="MediaView-Toolbar">
					<div>
						<button><img src="/admin/asset/icon/trash-dark.svg" alt=""/><span>Delete Media</span></button>
						<button><img src="/admin/asset/icon/refresh-dark.svg" alt=""/><span>Replace Media</span></button>
					</div>
					<div>
						<button><img src="/admin/asset/icon/check-dark.svg" alt=""/><span>Done</span></button>
					</div>
				</div>

				{mediaIsImage(props.item.publicPath) && <div class="MediaView-Image">
					<img src={props.item.publicPath} alt=""/>
				</div>}
			</div>
		);
	}
}
