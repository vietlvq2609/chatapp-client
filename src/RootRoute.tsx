import { Route, Routes } from "react-router-dom";

import {
  ChatPage,
  ChatList,
  Root,
  SignIn,
  SignUp,
  SettingPage,
  NotFound,
} from "./pages";

const RootRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="chat" element={<ChatList />} />
        <Route path="chat/:chatId" element={<ChatPage />} />
        <Route path="settings" element={<SettingPage />} />
      </Route>

      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RootRoute;
