import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import theme from "./src/lib/theme";
import RootNav from "./src/navigation/RootNav";
import firebase from "firebase";
import firebaseConfig from "./src/lib/firebaseConfig";
import AuthProvider from "./src/contexts/AuthProvider";
export default function App() {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	} else {
		firebase.app(); // if already initialized, use that one
	}

	return (
		<>
			<SafeAreaView style={styles.container}>
				<AuthProvider>
					<NavigationContainer>
						<RootNav />
					</NavigationContainer>
				</AuthProvider>
			</SafeAreaView>
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
