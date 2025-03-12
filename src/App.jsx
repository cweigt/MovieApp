//everything that starts with the word 'use' is a hook
import { useState } from 'react' 

//card component allows for reusability
const Card = ( { title } ) => { //accepting the title property (prop)
  //a call to the useState hook
  const [hasLiked, setHasLiked] = useState(false) //boolean variable, then a set function to update
  
  return (
    <div className="card">
      <h2>{title}</h2> {/*dynamically rendering title prop*/}

      <button onClick={() => setHasLiked(true)}> {/*this is to toggle the state*/}
        Like
      </button>
    </div>
  )
}

const App = () => {
  return (
    <div className="card-container">
      <Card title="Star Wars" rating={5} isCool={true} />
      <Card title="Avatar" />
      <Card title="Lord of the Rings" />  
    </div>
  )
}

export default App
