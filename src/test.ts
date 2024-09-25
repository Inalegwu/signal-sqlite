import { Collection } from "signaldb";
import createSqlitePersistenceAdapter from "./index.ts";

type Contact = {
	id: string;
	name: string;
	phone: string;
};

const collection = new Collection<Contact>({
	persistence: createSqlitePersistenceAdapter("fake.db", (builder) => {
		builder.setColumnDefinitions({
			id: "TEXT",
			name: "TEXT",
			phone: "INTEGER",
		});
	}),
});

collection.insert({
	name: "disgruntleddev",
	phone: "0",
	id: "12",
});

collection.insert({
	name: "disgruntleddev",
	phone: "0",
	id: "13",
});

collection.insert({
	name: "disgruntleddev",
	phone: "0",
	id: "14",
});

const vals = collection.find({});

console.log({ vals: vals.count() });
