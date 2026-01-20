import { Switch, Route } from "wouter";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Registration from "./pages/Registration";
import Rules from "./pages/Rules";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>

      <Route path="/about">
        <Layout>
          <About />
        </Layout>
      </Route>

      <Route path="/registration">
        <Layout>
          <Registration />
        </Layout>
      </Route>

      <Route path="/rules">
        <Layout>
          <Rules />
        </Layout>
      </Route>

      {/* Fallback */}
      <Route>
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

export default Router;
