import { useState } from "react";
import Item from "./Item";

export default function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
	OnClearList,
}) {
	const [sortBy, setSortBy] = useState("input");
	let sortedItems; // derived state
	if (sortBy === "input") sortedItems = items;
	if (sortBy === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortBy === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));
	// we use slice to take a copy from the items, to prevent changing the original.
	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
						key={item.id}
					/>
				))}
			</ul>
			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={OnClearList}>Clear list</button>
			</div>
		</div>
	);
}
