import Routes from "./src/routes/Routes";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
export default function App() {
  console.reportErrorsAsExceptions = false;
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}