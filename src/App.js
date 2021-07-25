import Dashboard from "../src/UserDirectory/main/Dashboard"
import { Switch, Route } from "react-router-dom";
import AddUser from "../src/UserDirectory/main/AddUser";
import EditUser from "../src/UserDirectory/main/EditUser";

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/addUser" component={AddUser} />
      <Route exact path="/editUser/:id" component={EditUser} />
    </Switch>
  </div>
  );
}

export default App;