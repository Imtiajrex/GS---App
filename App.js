import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootNav from "./src/navigation/RootNav";

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<RootNav />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
