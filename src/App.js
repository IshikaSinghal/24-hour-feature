import logo from './logo.svg';
import './App.css';
import AddStories from './components/AddStories';
import { ViewStoryContextProvider } from "./context/ViewStoryContext";

function App() {
  return (
    <div className="App">
      <ViewStoryContextProvider>
        <AddStories></AddStories>
      </ViewStoryContextProvider>
    </div>
  );
}

export default App;
