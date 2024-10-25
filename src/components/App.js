import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
// const initialItems = [
// 	{ id: 1, description: "Passports", quantity: 2, packed: false },
// 	{ id: 2, description: "Socks", quantity: 12, packed: true },
// 	{ id: 3, description: "Charger", quantity: 1, packed: false },
// ];

/* Controlled Elements
    - This technique it's React who controls and owns the state of input fields and 
    no longer the DOM, and to keep this data inside the application we need to use state.
    - Allow React to keep our component state in sync of the dumb form elements.
    Consists of 3 steps
    [1] we define a piece of state.
    [2] we use that piece of state on that element we want to control.
    (force the element to always take the value of this state variable)
    [3] update that state variable. (using the onChange handler)
    In turn, React will be in charge of the state and of the entire element.
    Conclusion: we call an input element that is completely synchronised with state a controlled element.
 */
export default function App() {
	const [items, setItems] = useState([]); // lifting-up state to enable siblings from sharing it
	// add something to items array. (we need to increase the array size so use spread operator)
	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}
	// delete something from items array. (we need to decrease the array size so use filter)
	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}
	// update something from the items array. (we need to keep the array size fixed so use map)
	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	} // note! you can't update the item like if it was a mutable variable.
	// { ...item, packed: !item.packed }         here we spread the item propertes and add packed with the new value and it will overwrite the old one as the old one is before it.
	function handleClearList() {
		const confirmed = window.confirm(
			"Are you Sure You want to clear the list?"
		);
		if (confirmed) setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
				OnClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}
