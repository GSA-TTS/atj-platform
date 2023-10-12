import { Header } from './components/header';
import { Footer } from './components/footer';
import { UsaBanner } from './components/usa-banner';
import { HomePage } from './routes';
import { useAppContext } from './context';

export const App = () => {
  const context = useAppContext();
  return (
    <div className="App">
      <UsaBanner />
      <Header />
      <HomePage />
      <Footer github={context.github} />
    </div>
  );
};
