import { redirect } from "@remix-run/react";
import App from "./app";

export function loader () {
  return redirect('/app/lobby')
}

export default function Index() {
  return <App />;
}
