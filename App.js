import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import theme from "./src/lib/theme";
import RootNav from "./src/navigation/RootNav";
import Results from "./src/screens/Results";
export default function App() {
	return (
		<>
			<View style={styles.container}>
				{/* <NavigationContainer>
					<RootNav />
				</NavigationContainer> */}
				<Results />
			</View>
			<StatusBar hidden={true} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.color.background,
	},
});
