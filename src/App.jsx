import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("effect", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    //clean up
    return () => {
      console.log("------> clean up");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  //remove the cursor when the effect is on -> no-cursor is a class
  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled);
    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [enabled]);

  return (
    <>
      <main>
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid #fff",
            borderRadius: "50%",
            opacity: 0.8,
            pointerEvents: "none",
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />

        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? "Disable" : "Enable"} follow pointer
        </button>
      </main>
    </>
  );
};

function App() {
  return <FollowMouse />;
}

export default App;
