import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { GlobalStyles } from './GlobalStyles';
import { AppContext, defaultContext } from './context';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GlobalStyles />
		<AppContext.Provider value={defaultContext}>
			<Provider store={store}>
				<App />
			</Provider>
		</AppContext.Provider>
	</StrictMode>
);
