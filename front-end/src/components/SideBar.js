import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { logoutAction } from "../redux/actions";
import { useDispatch } from "react-redux";

const SideBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="sidebar">
      <List disablePadding dense style={{ marginTop: '5px'}}>
        <Link to="/">
          <ListItem>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <ListItem button onClick={handleClick}>
          <ListItemText primary="Product" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <Link to="/product">
              <ListItem button className={classes.nested}>
                <ListItemText primary="Manage Product" />
              </ListItem>
            </Link>
            <Link to="product-flow">
              <ListItem button className={classes.nested}>
                <ListItemText primary="Product Flow" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <Link to="/category">
          <ListItem>
            <ListItemText primary="Category" />
          </ListItem>
        </Link>
        <Link to="/recipe">
          <ListItem>
            <ListItemText primary="Recipe Images" />
          </ListItem>
        </Link>
        <Link to="/payment-proof">
          <ListItem>
            <ListItemText primary="Payment Images" />
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem>
            <ListItemText primary="Transactions" />
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem>
            <ListItemText primary="Complain" />
          </ListItem>
        </Link>
        <Button onClick={() => dispatch(logoutAction())}>
          Sign Out
        </Button>
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedFont: {
    fontSize: 50,
  },
}));

export default SideBar;