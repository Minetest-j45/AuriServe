export type T = any;

export type Prop = FieldProp | TableProp | ArrayProp;

export interface FieldProp {
	name?: string;
	optional?: true;
	default?: any;
	type: string;
}

export interface TableProp {
	name?: string;
	optional?: true;
	
	fields: PropsTable;
}

export interface ArrayProp {
	name?: string;
	optional?: true;	
	
	entries: PropType | PropsTable;
}

export interface PropsTable {
	[key: string]: Prop;
};

export interface Config {
	name?: string;

	props: PropsTable;
	manageElement?: Element;
	hydrate?: true;
}

export type BasePropType = 
	"text" | "long_text" | "number" | "date" | "time" | "datetime" | "boolean" | "color" | "media" | "url";

export type PropType =
	BasePropType | "text:markdown" | "long_text:markdown" | "media:image" | "url:image"
