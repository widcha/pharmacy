import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import queryString from "querystring";
import {fetchNotifAdmin} from "../redux/actions";

const NotificationAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifAdmin());
  }, [dispatch]);

  const [quer, setQuer] = useState("");
  useEffect(() => {
    const que = queryString.parse(window.location.search)["?select"];
    setQuer(que);
  }, []);

  useEffect(() => {
    if (quer !== "") {
      dispatch(fetchNotifAdmin(quer));
    }
  }, [dispatch, quer]);

  const renderHeader = () => {
    return (
      <div className="flex flex-row">
        <div className="flex">
          <Link to="/notifs">
            <Button
              style={{backgroundColor: "grey", color: "whitesmoke", outline: 0}}
            >
              All
            </Button>
          </Link>
        </div>
        <div className="flex mx-3">
          <Link to="/notifs?select=1">
            <Button
              style={{backgroundColor: "grey", color: "whitesmoke", outline: 0}}
            >
              Unread
            </Button>
          </Link>
        </div>
      </div>
    );
  };
  const renderNotif = () => {
    return <div>{quer !== "" ? "" : null}</div>;
  };
  return (
    <div className="mt-4 flex flex-column">
      {renderHeader()}
      {renderNotif()}
    </div>
  );
};

export default NotificationAdmin;
