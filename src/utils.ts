type KeysToString<T extends { id: unknown } & Record<string, unknown>> = {
	[K in keyof T]: string;
};

export function createStringMapper<
	T extends { id: unknown } & Record<string, unknown>,
>(): KeysToString<T> {
	return new Proxy({} as KeysToString<T>, {
		get: (target, prop) => {
			return typeof prop === "string" ? prop : String(prop);
		},
	});
}
