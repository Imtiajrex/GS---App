import { Dimensions } from "react-native";
const dimensions = Dimensions.get("screen");
const theme = {
	color: {
		background: "#101317",
		card: "#171B21",
		primary: "#F1D18A",
		secondary: "#F73859",
		tertiary: "#25D4DF",
		primaryText: "#CFCCC5",
		secondaryText: "#667589",
	},
	font: {
		small: 16,
		regular: 19,
		big: 21,
	},
	width: dimensions.width,
	height: dimensions.height,
};
export default theme;
