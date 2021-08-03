import React from "react";
import TabNav from "./TabNav";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Text, View } from "react-native";
import { Easing } from "react-native-reanimated";
import Match from "../screens/Match";

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
			<Stack.Navigator initialRouteName="Tab" headerMode="none">
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
						];
					}}
				/>
			</Stack.Navigator>
		</View>
	);
}
