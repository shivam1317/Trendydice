import React, { useEffect } from "react";
import "antd/dist/reset.css";
import "./index.css";
import Usercard from "./components/Usercard";
import Loader from "./components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "./redux/slice/userSlice";

const App = () => {
  const data = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const fetchData = async () => {
    console.log("I got called!");
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await res.json();
    let d = new Date();
    let hours = d.getHours();
    localStorage.setItem("hour", JSON.stringify(hours));
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(setUsers(users));
  };
  useEffect(() => {
    setTimeout(() => {
      let d = new Date();
      let hours = d.getHours();
      let hour = JSON.parse(localStorage.getItem("hour"));
      let users = JSON.parse(localStorage.getItem("users"));
      if (hour !== hours || !hour || !users) {
        fetchData();
      } else {
        dispatch(setUsers(users));
      }
    }, 2000);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {data.length === 0 ? (
        <Loader />
      ) : (
        data.map((user, idx) => {
          return <Usercard user={user} key={user.id} idx={idx} />;
        })
      )}
    </div>
  );
};

export default App;
