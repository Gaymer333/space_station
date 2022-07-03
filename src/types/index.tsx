export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export enum BaseChangeAmountActions {
	'add',
	'subtract',
}

export enum AdvancedChangeAmountActions {
	'add',
	'subtract',
	'set'
}
