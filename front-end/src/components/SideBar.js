import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

const SideBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="sidebar">
      <List disablePadding dense>
        <Link to="/">
          <ListItem
            button
            className={classes.listWrap}
            selected={selectedIndex === 0}
            onClick={(e) => handleListItemClick(e, 0)}
          >
            <ListItemText className={classes.nestedFont} primary="Dashboard" />
          </ListItem>
        </Link>

        <ListItem button onClick={handleClick}>
          <ListItemText className={classes.nestedFont} primary="Product" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            dense
            button
            selected={selectedIndex === 1}
            onClick={(e) => handleListItemClick(e, 1)}
          >
            <Link to="/product">
              <ListItem
                button
                className={`${classes.nested} ${classes.listWrap}`}
                selected={selectedIndex === 2}
              >
                <ListItemText
                  className={classes.nestedFont}
                  primary="Manage Product"
                />
              </ListItem>
            </Link>
            <Link
              to="product-flow"
              button
              selected={selectedIndex === 2}
              onClick={(e) => handleListItemClick(e, 2)}
            >
              <ListItem
                button
                className={`${classes.nested} ${classes.listWrap}`}
              >
                <ListItemText
                  className={classes.nestedFont}
                  primary="Product Flow"
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <Link to="/category">
          <ListItem
            button
            className={classes.listWrap}
            selected={selectedIndex === 3}
            onClick={(e) => handleListItemClick(e, 3)}
          >
            <ListItemText className={classes.nestedFont} primary="Category" />
          </ListItem>
        </Link>
        <Link to="/recipe">
          <ListItem
            button
            className={classes.listWrap}
            selected={selectedIndex === 4}
            onClick={(e) => handleListItemClick(e, 4)}
          >
            <ListItemText
              className={classes.nestedFont}
              primary="Prescription Images"
            />
          </ListItem>
        </Link>
        <Link to="/payment-proof">
          <ListItem
            button
            className={classes.listWrap}
            selected={selectedIndex === 5}
            onClick={(e) => handleListItemClick(e, 5)}
          >
            <ListItemText
              className={classes.nestedFont}
              primary="Payment Images"
            />
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem
            button
            className={classes.listWrap}
            selected={selectedIndex === 6}
            onClick={(e) => handleListItemClick(e, 6)}
          >
            <ListItemText
              className={classes.nestedFont}
              primary="Transactions"
            />
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem
            button
            className={classes.listWrap}
            selected={selectedIndex === 7}
            onClick={(e) => handleListItemClick(e, 7)}
          >
            <ListItemText className={classes.nestedFont} primary="Complain" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedFont: {
    fontSize: 70,
  },
  listWrap: {
    paddingBottom: "7px",
    paddingTop: "7px",
    "&:hover": {
      color: "whitesmoke",
    },
    "&:focus": {
      color: "whitesmoke",
    },
  },
}));

export default SideBar;
