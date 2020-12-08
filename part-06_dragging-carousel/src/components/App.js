// imports

import { v4 as uuidv4 } from 'uuid';
import Carousel from './Carousel';

// ----------------------------

// city images

import chicagoImg from '../images/cities/chicago.jpg';
import sanFranciscoImg from '../images/cities/san-francisco.jpg';
import oaklandImg from '../images/cities/oakland.jpg';
import newYorkImg from '../images/cities/new-york.jpg';

const cityImageArray = [chicagoImg, sanFranciscoImg, oaklandImg, newYorkImg];

// ----------------------------

function App() {
  return (
    <div className='App'>
      <Carousel 
        id={uuidv4()} 
        images={cityImageArray}
        header='Cities'
        subheader='Popular cities in the U.S.'
      />
    </div>
  );
}

export default App;
