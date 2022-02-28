import "./App.css";
import useDocks, { DockActionTypes } from "./useDocks";
import Dock from "./Dock";

function App() {
  const [state, dispatch] = useDocks();
  return (
    <div
      className="App"
      onDragEnter={(event) => event.preventDefault()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => dispatch({ type: DockActionTypes.dragCardEnd })}
    >
      <button onClick={() => dispatch({ type: DockActionTypes.addDock })}>+</button>
      <div className="docks">
        {state.dockOrder.map((dockId) => (
          <Dock key={dockId} id={dockId} state={state} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

export default App;
