export const logCharAround = (sym = "-", times = 25) => {
	return (
		_: Object,
		__: string | number,
		descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
	) => {
		const oldFn = descriptor.value;
		descriptor.value = function (...args: any[]) {
			console.log(sym.repeat(times));
			oldFn?.apply(this, args);
			console.log(sym.repeat(times));
		};
	};
};
