import { v4 as uuidv4 } from 'uuid';

import Carousel from './Carousel'

function App() {
  return (
    <div className="App">
      <Carousel id={uuidv4()}/>
    </div>
  );
}

export default App;
