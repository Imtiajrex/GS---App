import React from "react";
import TabNav from "./TabNav";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { View } from "react-native";
import { Easing } from "react-native-reanimated";
import Match from "../screens/Match";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import LoadingScreen from "../screens/LoadingScreen";
const forFade = ({ current, closing }) => ({
	cardStyle: {
		opacity: current.progress,
	},
});
const Stack = createSharedElementStackNavigator();

const options = {
	animationTypeForReplace: "pop",
	gestureEnabled: false,
	headerBackTitleVisible: false,
	transitionSpec: {
		open: {
			animation: "timing",
			config: { duration: 250, easing: Easing.inOut(Easing.ease) },
		},
		close: {
			animation: "timing",
			config: { duration: 250, easing: Easing.inOut(Easing.ease) },
		},
	},
	cardStyleInterpolator: forFade,
};
export default function RootNav() {
	return (
		<View style={{ flex: 1, width: "100%" }}>
			<Stack.Navigator initialRouteName={"Loading"} headerMode="none">
				<Stack.Screen name="Loading" component={LoadingScreen} />
				<Stack.Screen name="Signin" component={SignIn} />
				<Stack.Screen name="Signup" component={SignUp} />
				<Stack.Screen name="Tab" component={TabNav} />
				<Stack.Screen
					name="Match"
					component={Match}
					options={options}
					sharedElementsConfig={(route, otherRoute, showing) => {
						const { item } = route.params;
						return [
							{
								id: `item.${item.id}.image`,
								animation: "move",
							},
							{
								id: `item.${item.id}.title`,
								animation: "fade",
								resize: "clip",
							},
							{
								id: `item.${item.id}.time`,
								animation: "fade",
								resize: "clip",
							},
							{
								id: `item.${item.id}.date`,
								animation: "fade",
								resize: "clip",
							},
						];
					}}
				/>
			</Stack.Navigator>
		</View>
	);
}
