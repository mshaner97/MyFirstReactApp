import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(17)

  return (
    <>
      <div className="card">
      </div>
      <Users />
      <RandomNumber />
    </>
  )
}
function Users() {
  const users = [
    {
      name: 'Ryan',
      age: 29,
      favoriteThings: ["pizza", "ponies", "the downfall of capitalism in the modern era"]
    },
    {
      name: 'Ali',
      age: 25,
      favoriteThings: ["pizza", "ponies", "the downfall of capitalism in the modern era"]
    },
    {
      name: 'Maggie',
      age: 27,
      favoriteThings: ["pizza", "ponies", "the downfall of capitalism in the modern era"]
    }
  ];
  return (
    <div>
      {users.map((user, userIndex) => (
        <div key={userIndex}>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>Favorite Things: </p>
          <ul>
            {user.favoriteThings.map((thing, thingIndex) => (
              <li key={thingIndex}>{thing}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
const RandomNumber = () => {
  const [number, setNumber] = useState(null);

  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 200));
  };
  const getNumberType = () => {
    if (number === null) return null;
    return number % 2 === 0 ? 'even' : 'odd';
  };
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Random Number</h2>
      <button
        onClick={generateNumber}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Generate Number
      </button>
      {number !== null && (
        <div className="mt-4">
        <p className="text-lg">
          Your random number is: {number} and it is {getNumberType()}
        </p>
        </div>
      )}
    </div>
  );
};
export default App