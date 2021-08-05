import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Keyboard,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import theme from "../lib/theme";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}
	const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

	React.useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		!isKeyboardVisible && (
			<KeyboardAvoidingView
				style={{
					flexDirection: "row",
					backgroundColor: "#101317",
					padding: 20,
					paddingHorizontal: 15,
				}}
			>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key,
						});
					};

					return (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							key={index}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{label == "Home" && (
								<Ionicons
									name="home"
									size={24}
									color={
										isFocused ? theme.color.primary : theme.color.primaryText
									}
									style={{ marginHorizontal: 5 }}
								/>
							)}
							{label == "Profile" && (
								<Ionicons
									name="person"
									size={24}
									color={
										isFocused ? theme.color.primary : theme.color.primaryText
									}
									style={{ marginHorizontal: 5 }}
								/>
							)}
							{isFocused && (
								<Text
									style={{
										color: isFocused
											? theme.color.primary
											: theme.color.primaryText,
										fontSize: theme.font.small,
									}}
								>
									{label}
								</Text>
							)}
						</TouchableOpacity>
					);
				})}
			</KeyboardAvoidingView>
		)
	);
}

export default function TabNav({ navigation }) {
	const { user } = useContext(AuthContext);
	React.useEffect(() => {
		if (user != null) navigation.navigate("Signin");
	}, []);
	return (
		<Tab.Navigator
			tabBar={(props) => <MyTabBar {...props} />}
			initialRouteName="Home"
			headerMode="none"
			tabBarOptions={{ keyboardHidesTabBar: true }}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}
