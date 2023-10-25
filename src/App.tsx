import { useState } from 'react'
import { ItemType } from "./types/types";
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import FormPage from './components/Form';


function App() {

	const [activeItem, setActiveItem] = useState<null | ItemType>(null);

	return (
		<>
			<Routes>
				<Route path="/" element={
					<MainPage activeItem={activeItem} setActiveItem={setActiveItem} />
				} />
				<Route path="form/:id" element={<FormPage activeItem={activeItem} />} />
				<Route path="send" element={<div>Форма отправлена</div>} />
			</Routes>
		</>
	)
}

export default App