import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Scores from './pages/Scores/Scores';
import PrivateRoute from './routing/PrivateRoute';
import AuthProvider from './context/auth/authProvider';
import { setAuthToken } from './utils/utils';
import './styles/globals.scss';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/scores' element={<PrivateRoute />}>
						<Route path='/scores' element={<Scores />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
