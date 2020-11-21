export interface WidgetProps {
	value: any;
	setValue: (newValue: any) => any;

	disabled?: boolean;
	placeholder?: string;
	
	style?: any;
	class?: string;
}

export { default as Label } from './InputLabel';
export { default as Annotation } from './InputAnnotation';

export { default as Text } from './fields/InputText';
export { default as Numeric } from './fields/InputNumeric';
export { default as Checkbox } from './fields/InputCheckbox';
