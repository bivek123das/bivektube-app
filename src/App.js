import './App.css';
import Body from './components/Body';
import Head from './components/Head';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';
import { toggleTheme } from './utils/themeSlice';
import Error from './components/Error';
import { lazy, Suspense } from 'react';
import LoadingPage from './components/LoadingPage'; 

// Lazy loaded pages
const MainContainer = lazy(() => import('./components/MainContainer'));
const Watchpage = lazy(() => import('./components/Watchpage'));
const Search = lazy(() => import('./components/Search'));

function App() {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-[#2a3541] text-white' : 'bg-white text-black'
      }`}
    >
       <Head
        btn={
          <button
            onClick={handleToggle}
            className="theme border-solid outline-none border-black border-[0.5px] px-2 py-1 rounded-2xl"
          >
            <i className="fa-regular fa-moon pr-2"></i>
            <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        }
      />
      <Body />
    </div>
  );
}

// Router setup with LoadingPage fallback
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingPage text="Loading home page..." />}>
            <MainContainer />
          </Suspense>
        ),
      },
      {
        path: 'watch',
        element: (
          <Suspense fallback={<LoadingPage text="Fetching video..." />}>
            <Watchpage />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<LoadingPage text="Searching..." />}>
            <Search />
          </Suspense>
        ),
      },
    ],
  },
]);

export default App;

