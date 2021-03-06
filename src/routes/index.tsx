import { Switch } from "react-router";
import { Map } from "../pages/Map";
import { PageNotFound } from "../pages/PageNotFound";
import { EventsList } from "../pages/EventsList";
import Home from "../pages/Home";
import { Info } from "../pages/Info";
import { JoinUsForms } from "../pages/JoinUsForms";
import { useAuth } from "../providers/AuthContext";
import { Route } from "./Routes";
import { Profile } from "../pages/Profile";
import Badges from "../pages/Badges";

export const Routes = () => {
  const { accessToken } = useAuth();

  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Profile} isPrivate />
      <Route path="/info" component={Info} isPrivate />
      <Route exact path="/joinUs" component={JoinUsForms} />
      <Route exact path="/map" component={Map} isPrivate/>
      <Route exact path="/events" component={EventsList} isPrivate/>
      <Route exact path="/badges" component={Badges} isPrivate/>
      <Route component={PageNotFound} isPrivate={!!accessToken} />
    </Switch>
  );
};
