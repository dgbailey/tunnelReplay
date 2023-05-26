import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
const DogImage = ({ breed }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((response) => {
        if(response.status === 404){
          Sentry.captureException(new Error("Image not found 404"));
        }
        return response.json()
      })
      .then((data) => setImageUrl(data.message))
      .catch((error) => Sentry.captureException(error));
  }, [breed]);

  return (
    <div>
      <h2>{breed}</h2>
      <img src={imageUrl} alt={breed} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dogs/husky">Husky</Link>
            </li>
            <li>
              <Link to="/dogs/labrador">Labrador</Link>
            </li>
            <li>
              <Link to="/dogs/unknown">Unknown</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/dogs/:breed" render={({ match }) => <DogImage breed={match.params.breed} />} />
          <Route path="/">
            <h1>Welcome to the Dog Image App</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
