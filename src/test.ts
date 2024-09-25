import { Collection } from "signaldb";
import createSqlitePersistenceAdapter from "./index.ts";

// type signature of the collection
type Contact = {
	id: string;
	name: string;
	phone: string;
};

const collection = new Collection<Contact>({
	// create the persistence adapter directed at a
	// database @ database path
	persistence: createSqlitePersistenceAdapter("fake.db", (builder) => {
		// set the table column definitions from
		// here to ensure it is available in the
		// builder context within the package
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
