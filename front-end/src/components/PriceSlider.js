import React, { useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { fetchProductsFilteredByPrice } from "../redux/actions/productAction";

// const useStyles = makeStyles({
// 	root: {
// 		width: 200,
// 	},
// });

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      root: {
        width: 200,
        color: "black",
        height: 2,
        padding: "15px 0",
      },
      thumb: {
        background: "teal",
        color: "teal",
      },
      track: {
        color: "teal",
      },
      rail: {
        color: "gray",
      },
      valueLabel: {
        color: "black",
      },
    },
  },
});

// function valuetext(value) {
// 	console.log(`price range between ${value[0]} and ${value[1]}`);
// 	console.log(`${value}°C`);
// }

export default function PriceSlider(props) {
  const dispatch = useDispatch();

  const { max_price, category_id } = props;
  console.log(max_price);
  // const classes = useStyles();
  const [value, setValue] = React.useState([0, max_price]);
  useEffect(() => {
    const timer = setTimeout(async () => {
      dispatch(fetchProductsFilteredByPrice(value[0], value[1], category_id));
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);
  const rangeSelector = (event, newValue) => {
    setValue(newValue);

    // setTimeout(() => {
    // 	dispatch(
    // 		fetchProductsFilteredByPrice(newValue[0], newValue[1], category_id)
    // 	);
    // }, 1000);
  };

  return (
    // <div className={classes.root}>
    <ThemeProvider theme={muiTheme}>
      <Typography id="range-slider" gutterBottom className="text-gray-700">
        Price
      </Typography>
      <Slider
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="off"
        max={max_price}
        aria-labelledby="range-slider"
      />
      {/* Your range of Price is between {value[0]} /- and {value[1]} */}
      <div className="w-max text-gray-700">
        <span>Rp. {value[0].toLocaleString()}</span> -{" "}
        <span>Rp. {value[1].toLocaleString()}</span>
      </div>
    </ThemeProvider>
    // </div>
  );
}
