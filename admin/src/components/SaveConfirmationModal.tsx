import * as Preact from 'preact';

import './SaveConfirmationModal.sass';

interface Props {
	active: boolean;

	onReset: () => void;
	onSave: () => void;
}

export default class SaveConfirmationModal extends Preact.Component<Props, {}> {
	render(_: Props) {
		return (
			<div class={'SaveConfirmationModal' + (this.props.active ? ' Active' : '')}>
				<div class='SaveConfirmationModal-Box'>
					<img src="/admin/asset/icon/save-dark.svg" />
					<p>You have unsaved changes.</p>
					<div class='SaveConfirmationModal-Spacer' />
					<button class='SaveConfirmationModal-ResetButton' onClick={this.props.onReset}>Reset</button>
					<button class='SaveConfirmationModal-SaveButton' onClick={this.props.onSave}>Save</button>
				</div>
			</div>
		);
	}
}
