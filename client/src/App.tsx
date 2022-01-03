import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Auth from './pages/Auth/Auth';
import Scores from './pages/Scores/Scores';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/scores' element={<Scores />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
