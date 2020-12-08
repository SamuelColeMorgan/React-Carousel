// library imports

import { v4 as uuidv4 } from 'uuid';

// ----------------------------

// component imports

import Carousel from './Carousel';

// ----------------------------

// carousel images

import chicagoImg from '../images/cities/chicago.jpg';
import sanFranciscoImg from '../images/cities/san-francisco.jpg';
import oaklandImg from '../images/cities/oakland.jpg';
import newYorkImg from '../images/cities/new-york.jpg';

import forestImg from '../images/nature/forest.jpg';
import marshImg from '../images/nature/marsh.jpg';
import treeImg from '../images/nature/tree.jpg';

// ----------------------------

// images arrays

const cityImageArray = [chicagoImg, sanFranciscoImg, oaklandImg, newYorkImg];
const natureImageArray = [forestImg, marshImg, treeImg];

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
      <Carousel
        id={uuidv4()}
        images={natureImageArray}
        header='Nature'
        subheader='Some nice scenes of nature.'
      />
    </div>
  );
}

export default App;
