import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { useState } from "react";
import theme from "../lib/theme";
import firebase from "firebase";
import { validateEmail } from "../lib/utils";
import AnimatedLottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
export default function SignUp({ navigation, route }) {
	const { user, setUser } = useContext(AuthContext);
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	useFocusEffect(() => {
		checkIfLoggedIn();
	});
	const checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged((userSession) => {
			if (userSession) {
				if (user) navigation.navigate("Tab");
				else
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
						});
			}
		});
	};
	const getUserNavigate = (email) => {
		firebase
			.firestore()
			.collection("User")
			.where("email", "==", email)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					setUser({ ...doc.data(), id: doc.id });
				});
				navigation.navigate("Tab");
			});
	};
	const validate = () => {
		const newError = { email: "", password: "" };

		if (data.email.length == 0) newError["email"] = "Enter Email!";
		else newError["email"] = "";

		if (data.password.length == 0) newError["password"] = "Enter Password!";
		else newError["password"] = "";

		if (newError.email != "" || newError.password != "") {
			setErrors(newError);
			return false;
		}

		if (!validateEmail(data.email)) newError["email"] = "Email Not Valid!";
		else newError["email"] = "";

		if (data.password.length < 8)
			newError["password"] = "Password has to be 8 Characters or more";
		else newError["password"] = "";

		if (newError.email != "" || newError.password != "") {
			setErrors(newError);
			return false;
		}

		setErrors(newError);
		return true;
	};
	const signIn = (e) => {
		if (!loading) {
			setLoading(true);
			if (validate())
				firebase
					.auth()
					.signInWithEmailAndPassword(data.email, data.password)
					.then((userCredential) => {
						getUserNavigate(userCredential.user.email);
					})
					.catch((error) => {
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorCode, errorMessage);
						setLoading(false);
					});
			else setLoading(false);
		}
	};

	const handleChange = (text, dataKey) => {
		const dataInstance = { ...data };
		dataInstance[dataKey] = text;
		setData(dataInstance);
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.title}>Sign in</Text>

				<TextInput
					placeholder="Email"
					style={styles.input}
					placeholderTextColor="#1B2531"
					onChangeText={(text) => handleChange(text, "email")}
					keyboardType={"email-address"}
					textContentType={"emailAddress"}
				/>
				{errors.email.length > 0 && (
					<Text style={styles.error}>{errors.email}</Text>
				)}
				<TextInput
					placeholder="Password"
					style={styles.input}
					placeholderTextColor="#1B2531"
					onChangeText={(text) => handleChange(text, "password")}
					textContentType={"password"}
					secureTextEntry={true}
				/>
				{errors.password.length > 0 && (
					<Text style={styles.error}>{errors.password}</Text>
				)}
				<TouchableOpacity style={styles.button} onPress={signIn}>
					{loading ? (
						<AnimatedLottieView
							autoPlay={true}
							style={{
								width: 30,
								height: 30,
								backgroundColor: theme.color.background,
							}}
							source={require("../../assets/loading.json")}
						/>
					) : (
						<Text style={styles.button_text}>Login</Text>
					)}
				</TouchableOpacity>
				<View style={styles.info}>
					<Text style={styles.info_text}>Don't have an account?</Text>
					<TouchableOpacity
						style={styles.signup}
						onPress={() => navigation.navigate("Signup")}
					>
						<Text style={styles.signup_text}>Signup</Text>
					</TouchableOpacity>
				</View>
				<Image source={require("../../assets/icon.png")} style={styles.icon} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: theme.color.background,
		justifyContent: "center",
		width: theme.width,
		padding: 40,
		height: theme.height,
	},
	title: {
		fontWeight: "bold",
		fontSize: theme.font.big,
		color: theme.color.primaryText,
		marginBottom: 40,
		textAlign: "center",
		width: "100%",
	},
	input: {
		width: "100%",
		padding: 20,
		textAlign: "left",
		borderRadius: 50,
		fontSize: theme.font.regular,
		color: theme.color.primaryText,
		backgroundColor: "#0A0E13",
		marginVertical: 10,
	},
	icon: {
		// position: "absolute",
		// bottom: 20,
		width: 65,
		height: 65,
	},
	button: {
		width: "100%",
		padding: 15,
		borderRadius: 50,
		borderColor: theme.color.primary,
		borderWidth: 3,
		justifyContent: "center",
		marginTop: 20,
		alignItems: "center",
	},
	button_text: {
		fontSize: theme.font.regular,
		color: theme.color.primary,
	},
	info: {
		flexDirection: "row",
		marginVertical: 20,
	},
	info_text: {
		fontSize: theme.font.small,
		color: theme.color.secondaryText,
		marginRight: 10,
	},
	signup_text: {
		fontSize: theme.font.small,
		color: theme.color.primary,
	},
	error: {
		fontSize: theme.font.small,
		color: theme.color.secondary,
	},
});
