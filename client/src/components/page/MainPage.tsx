import React, { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../../services/authService";
import { Button } from "@material-ui/core";
// import ChallengeContainer from "../challenge/ChallengeContainer";

const MainPage: React.FC = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setUser({ ...user });
  }, []);

  // const { data } = useQuery(GET_USER);

  return (
    <div>
      {JSON.stringify(user)} <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default MainPage;
