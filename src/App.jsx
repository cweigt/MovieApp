//everything that starts with the word 'use' is a hook
import { useState } from 'react' 

//card component allows for reusability
//same as doing function Card(title){}
const Card = ( { title } ) => { //accepting the title property (prop)
  //a call to the useState hook
  //having the useState here allows for seperate liking of each card
  const [hasLiked, setHasLiked] = useState(false) //boolean variable, then a set function to update
  
  return (
    <div className="card">
      <h2>{title}</h2> {/*dynamically rendering title prop*/}

      {/*Flipping it to enable the liking and unliking*/}
      <button onClick={() => setHasLiked(!hasLiked)}> {/*settingHasLiked to the opposite state*/}
        {hasLiked ? '🩷' : '🤍'} {/*setting display based on state*/}
      </button>
    </div>
  )
}

//Thi is the main function that is called when the app is rendered
//Each "Card component" below is an instance of the card component above
const App = () => {
  return (
    <div className="card-container">
      <Card title="Lord of the Rings" rating={5} isCool={true} />
      <Card title="Avatar" />
      <Card title="Star Wars" />  
    </div>
  )
}

export default App
