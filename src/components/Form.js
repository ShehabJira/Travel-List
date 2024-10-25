import { useState } from "react";

export default function Form({ onAddItems }) {
	const [description, setDescription] = useState(""); // controlled element
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(ev) {
		ev.preventDefault(); // as the default of forms is to make a reload for the page.
		if (!description) return; // if the description is empty return and don't add anything.
		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		onAddItems(newItem);
		// After Adding the item, reset the input fields
		setDescription("");
		setQuantity(1);
	}
	return (
		<form className="add-form" onSubmit={handleSubmit}>
			{/* onSubmit={handleSubmit} === onSubmit={(ev)=> handleSubmit(ev)}*/}
			<h3>What do you need for your 😍 trip?</h3>
			{/* Control This Select Element */}
			<select onChange={(ev) => setQuantity(+ev.target.value)} value={quantity}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((ele) => (
					<option value={ele} key={ele}>
						{ele}
					</option>
				))}
			</select>
			{/* Control This Input Element */}
			<input
				type="text"
				placeholder="Item..."
				onChange={(ev) => setDescription(ev.target.value)}
				value={description}
			/>
			<button>Add</button>
		</form>
	);
}
// in forms, if you clicked on any button or pressed enter the form will be submitted.
