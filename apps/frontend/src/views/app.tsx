import { Header } from './components/header';
import { UsaBanner } from './components/usa-banner';
import { HomePage } from './pages';

export const App = () => {
  return (
    <div className="App">
      <UsaBanner />
      <Header />
      <>
        <HomePage />
      </>
    </div>
  );
};
