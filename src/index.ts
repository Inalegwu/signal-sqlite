import { Database } from "@db/sqlite";
import { Statement } from "@disgruntleddevs/sqlgen";
import * as fs from "node:fs";
import { createPersistenceAdapter } from "npm:signaldb";

type Fn<T extends Record<string, unknown>> = (builder: Statement<T>) => void;

export default function createSqlitePersistenceAdapter<
	T extends { id: I } & Record<string, unknown>,
	I,
>(databasePath: string, buildColumnDefs: Fn<T>) {
	const db_name = "signal__collection";
	const builder = new Statement<T>(db_name);

	const db = new Database(databasePath);

	buildColumnDefs(builder);

	return createPersistenceAdapter<T, I>({
		register: async (onChange) => {
			console.log("registering db...");

			db.exec(builder.newCreateStatement());

			fs.watchFile(databasePath, () => {
				console.log("watching file...");
				onChange();
			});
		},
		load: async () => {
			console.log("loading db data....");
			const items = db.sql`SELECT * FROM ${db_name}` as T[];

			console.log({ items });

			return {
				items,
			};
		},
		save: async (values) => {
			console.log("saving data to db...");
			const keys = Object.keys(values);

			console.log(keys);

			const statement = keys.reduce(
				// @ts-ignore: idk
				(q, val) => q.replace("?", values[val]),
				builder.newInsertStatement({}),
			);

			console.log({ statement });

			db.sql`${statement}`;
		},
	});
}
