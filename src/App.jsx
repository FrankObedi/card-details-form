import { useState } from "react";
import CardForm from "./components/New Form/CardForm";
import CardUI from "./components/Card UI/CardUI";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CardUI />
      <CardForm />
    </div>
  );
}

export default App;
