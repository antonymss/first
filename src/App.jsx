import logo from "./logo.svg";
import "./App.css";
import React from "react"

const fetchUsers = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccessed = Math.random() > 0.1; 
      if (isSuccessed) {
        resolve([
          {
            name: "John Doe",
            age: 28,
            address: {
              city: "New York",
              street: "Broadway",
            },
          },
          {
            name: "Jack Johnson",
            age: 32,
            address: {
              city: "New York",
              street: "Park Ave",
            },
          },
          {
            name: "John Jackson",
            age: 23,
            address: {
              city: "New York",
              street: "St Marks Pl",
            },
          },
        ]);
      } else {
        reject(new Error("502 Bad Gateway"));
      }
    }, Math.random() * 1000);
  });

const fetchNewUserInfo = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccessed = Math.random() > 0.1;
      if (isSuccessed) {
        resolve([
          {
            age: 30,
            city: "Los Angeles",
            street: "Rodeo Drive",
          },
          {
            age: 34,
            city: "Los Angeles",
            street: "Hollywood Boulevard",
          },
          {
            age: 25,
            city: "Los Angeles",
            street: "Sunset Boulevard",
          },
        ]);
      } else {
        reject(new Error("500 Internal Server Error"));
      }
    }, Math.random() * 1000);
  });

function App() {
  const [users, setUsers] = React.useState([]);
  const [oldUsers, setOldUsers] = React.useState([]);

  React.useEffect( () => {
     async function fetchData() {
        try {
    const fetchedUsers = await fetchUsers();
    const fetchedNewUserInfo = await fetchNewUserInfo();
        
   
    setOldUsers(fetchedUsers);

    setUsers(
      fetchedUsers.map((fetchedUser, idx) => {
        const newUser = { ...fetchedUser};
        newUser.address = {...fetchedUser.address};
        newUser.age = fetchedNewUserInfo[idx].age;
        newUser.address.city = fetchedNewUserInfo[idx].city;
        newUser.address.street = fetchedNewUserInfo[idx].street;

        return newUser;
      })
    );
          } catch (e) {

        }
        };
    fetchData();
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload. h1
        </p>

        111
      </header>
    </div>
  );
}

export default App;
