import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ArticlesView from './views/ArticlesView';

const App = () => (
  <>
    <ul>
      <li>
        <Link to="/articles">Поиск картинок</Link>
      </li>
    </ul>

    <Switch>
      <Route path="/articles">
        <ArticlesView />
      </Route>
    </Switch>
  </>
);

export default App;
