import React, { ReactNode } from "react";
import { useAppDispatch } from "./redux/store";
import { initiateAuth } from "./redux/authSlice";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  const dispatch = useAppDispatch();
  dispatch(initiateAuth());

  return <>{children}</>;
};

export default App;
