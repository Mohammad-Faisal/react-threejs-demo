import "./App.css";
import CanvasComponent from "./components/CanvasComponent";
import Overlay from "./Overlay";
import { ComputerModel } from "./components/ComputerModel";

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "90vh" }}>
      <CanvasComponent>
        <ComputerModel />
      </CanvasComponent>
      <Overlay />
    </div>
  );
}

export default App;
