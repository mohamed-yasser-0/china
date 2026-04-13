import { useContext } from "react";
import { AuthContext } from "../../context/settingContext";
import Home from "../Home/Home";
import ProfilePage from "../Profile/Page";

export default function State() {
  const { user } = useContext(AuthContext);

  // حماية لو مفيش user
  if (!user) {
    return <div>Loading...</div>;
  }

  console.log("user", user.role);

  if (user.role === "ADMIN") {
    return <Home />;
  } else if (user.role === null) {
    return <div>No Role</div>;
  } else {
    return <ProfilePage />;
  }
}