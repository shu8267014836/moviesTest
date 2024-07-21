import { useEffect, useState } from 'react';
import './App.css';
import Comedy from './pages/Comedy';

function App() {
	
	const [showDesktopWarning, setShowDesktopWarning] = useState(false);
	useEffect(() => {
		const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if (width <= 575)
			setShowDesktopWarning(true)
	}, [])
	
	return (
		<>
			{showDesktopWarning ?
				<><Comedy /></>
				:
				<p>Dear User, This Application is only supported on Mobile.</p>
			}
		</>
	);
}

export default App;
