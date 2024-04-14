import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import "./index.css";
import Login from "./components/login/Login";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { auth } from "./config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSubscribe();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
