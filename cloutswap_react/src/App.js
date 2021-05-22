import './App.css';
import { SimpleCard } from './component/cards';
import { Navbar } from './component/navbar';

function App() {
	return (
		<div className="App">
			<div className="header">
				<Navbar />
			</div>
			<div className="app_body">
				<SimpleCard />
			</div>
		</div>
	);
}

export default App;
