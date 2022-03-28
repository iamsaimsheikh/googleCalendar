import "./App.css";
import GlobalContextProvider from "./contexts/GlobalContext";
import Demo from "./demo";
import Header from "./layouts/Header";
import Calendar from "./templates/Calendar";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Calendar />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
