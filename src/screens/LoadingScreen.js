import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View, Text } from "react-native";
import theme from "../lib/theme";
import firebase from "firebase";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
export default function LoadingScreen({ navigation }) {
	const { setUser } = useContext(AuthContext);
	useFocusEffect(() => {
		checkIfLoggedIn();
	});
	const checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase
					.firestore()
					.collection("User")
					.where("email", "==", user.email)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							setUser({ ...doc.data(), id: doc.id });
						});
						navigation.navigate("Tab");
					})
					.catch((err) => {
						console.log(err);
						navigation.navigate("Signin");
					});
			} else navigation.navigate("Signin");
		});
	};
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.color.background,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<AnimatedLottieView
				autoPlay={true}
				style={{
					width: 200,
					height: 200,
					backgroundColor: theme.color.background,
				}}
				source={require("../../assets/loading.json")}
			/>
		</View>
	);
}
