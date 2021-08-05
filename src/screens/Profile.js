import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	FlatList,
} from "react-native";
import theme from "../lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import { useState } from "react";
import firebase from "firebase";
import { AuthContext } from "../contexts/AuthProvider";
import { useEffect } from "react";
import AnimatedLottieView from "lottie-react-native";
export default function Profile({ navigation }) {
	const { user } = useContext(AuthContext);
	const [topup, setTopup] = useState(false);
	const [withdraw, setWithdraw] = useState(false);
	const [transactions, setTransactions] = useState([]);
	useEffect(() => {
		firebase
			.firestore()
			.collection("Transaction")
			.onSnapshot((snapshot) => {
				setTransactions(
					snapshot.docs.map((doc) => {
						// console.log({ ...doc.data(), User: "" });
						return { ...doc.data(), User: "" };
					})
				);
			});
	}, []);
	const logout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => navigation.navigate("Signin"))
			.catch((err) => console.log(err));
	};
	return (
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.top}>
				<View style={{ ...styles.details, marginBottom: 40 }}>
					<View style={styles.title_logout}>
						<Text style={styles.title}>Hi, {user.name}</Text>
						<TouchableOpacity style={styles.logout} onPress={logout}>
							<Text style={styles.logout_text}>Logout</Text>
						</TouchableOpacity>
					</View>
					<Image
						source={require("../../assets/user.png")}
						style={styles.user_image}
					/>
				</View>
				<View style={styles.details}>
					<Text style={styles.wallet_text}>My Wallet</Text>
					<Text style={styles.cash}>৳{user.balance}</Text>
				</View>
				<View style={styles.details}>
					<TouchableOpacity style={styles.topup} onPress={() => setTopup(true)}>
						<Text style={styles.topup_text}>Top Up</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.withdraw}
						onPress={() => setWithdraw(true)}
					>
						<Text style={styles.withdraw_text}>Withdraw</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.transaction_wrapper}>
				<View style={styles.ball} />
				<Text style={styles.title}>Recent Transactions</Text>

				<View style={styles.transactions}>
					{transactions.length != 0 ? (
						<FlatList
							data={transactions}
							keyExtractor={(_, index) => index.toString()}
							showsVerticalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<View style={styles.transaction}>
									<View style={styles.transaction_info}>
										<TransactionType type={item.type} />
										<View style={styles.info}>
											<Text style={styles.info_title}>{item?.title}</Text>
											<Text style={styles.info_description}>
												{item?.description}
											</Text>
										</View>
									</View>
									<Text style={styles.money}>
										৳{item?.amount}
										{item?.balance_type == "in" ? "+" : "-"}
									</Text>
								</View>
							)}
						/>
					) : (
						<Text style={styles.not_found}>No Transactions Available</Text>
					)}
				</View>
			</View>

			<AnimatePresence>
				{topup && <Topup setTopup={setTopup} />}
			</AnimatePresence>
			<AnimatePresence>
				{withdraw && <Withdraw setWithdraw={setWithdraw} />}
			</AnimatePresence>
		</KeyboardAvoidingView>
	);
}
const Topup = ({ setTopup }) => {
	const [submit, setSubmit] = useState(false);
	const [trx, setTrx] = useState("");
	return (
		<MotiView
			from={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
			}}
			style={styles.overlay}
		>
			<MotiView
				from={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{
					scale: 0,
				}}
				style={styles.topup_modal}
			>
				<TouchableOpacity style={styles.close} onPress={() => setTopup(false)}>
					<Ionicons name="close" size={25} color={theme.color.primaryText} />
				</TouchableOpacity>

				{submit ? (
					<View style={{ flexDirection: "column", alignItems: "center" }}>
						<AnimatedLottieView
							loop={false}
							autoPlay
							source={require("../../assets/ok.json")}
							style={{ width: 150, height: 150 }}
						/>
						<Text
							style={{
								fontSize: theme.font.regular,
								color: theme.color.primaryText,
								marginVertical: 20,
							}}
						>
							Topup Request Submitted!
						</Text>
					</View>
				) : (
					<>
						<Text style={styles.modal_title}>Top up</Text>

						<View style={styles.inputs}>
							<TextInput
								placeholder="Transaction ID"
								style={styles.input}
								onChangeText={(text) => setTrx(text)}
								placeholderTextColor="#2A3849"
							/>
							<TouchableOpacity
								style={styles.button}
								onPress={() => trx.length > 0 && setSubmit(true)}
							>
								<Text style={styles.button_text}>Recharge Account</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</MotiView>
		</MotiView>
	);
};
const Withdraw = ({ setWithdraw }) => {
	const [number, setNumber] = useState("");
	const [amount, setAmount] = useState(0);
	const [submit, setSubmit] = useState(false);
	return (
		<MotiView
			from={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
			}}
			style={styles.overlay}
		>
			<MotiView
				from={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{
					scale: 0,
				}}
				style={styles.withdraw_modal}
			>
				<TouchableOpacity
					style={styles.close}
					onPress={() => setWithdraw(false)}
				>
					<Ionicons name="close" size={25} color={theme.color.primaryText} />
				</TouchableOpacity>

				{submit ? (
					<View style={{ flexDirection: "column", alignItems: "center" }}>
						<AnimatedLottieView
							autoPlay
							loop={false}
							source={require("../../assets/ok.json")}
							style={{ width: 150, height: 150 }}
						/>
						<Text
							style={{
								fontSize: theme.font.regular,
								color: theme.color.primaryText,
								marginVertical: 20,
							}}
						>
							Withdraw Request Submitted!
						</Text>
					</View>
				) : (
					<>
						<Text style={styles.modal_title}>Top up</Text>

						<View style={styles.inputs}>
							<TextInput
								placeholder="Bkash Number"
								style={styles.input}
								onChangeText={(text) => setNumber(text)}
								placeholderTextColor="#2A3849"
							/>
							<TextInput
								placeholder="Amount"
								style={styles.input}
								onChangeText={(text) => setAmount(text)}
								placeholderTextColor="#2A3849"
							/>
							<TouchableOpacity
								style={styles.button}
								onPress={() =>
									number.length > 0 && amount.length > 0 && setSubmit(true)
								}
							>
								<Text style={styles.button_text}>Recharge Account</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</MotiView>
		</MotiView>
	);
};
const TransactionType = ({ type }) => {
	return (
		<View
			style={{
				...styles.icon,
				backgroundColor:
					type == "topup"
						? "rgba(247,56,89,0.2)"
						: type == "withdraw"
						? "rgba(37,212,223,0.2)"
						: "rgba(241,209,138,0.2)",
			}}
		>
			<Ionicons
				name={
					type == "topup"
						? "cloud-upload"
						: type == "withdraw"
						? "ios-cash"
						: "gift"
				}
				size={35}
				color={
					type == "topup"
						? theme.color.secondary
						: type == "withdraw"
						? theme.color.primary
						: theme.color.tertiary
				}
				style={{ opacity: 1 }}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.color.background },
	top: { backgroundColor: theme.color.card, padding: 20, paddingBottom: 60 },
	transaction_wrapper: { position: "relative", padding: 20, paddingTop: 0 },
	ball: {
		width: theme.width * 4,
		height: theme.width * 4,
		position: "absolute",
		top: "-30%",
		transform: [{ translateX: -theme.width * 1.5 }],
		backgroundColor: theme.color.background,
		borderRadius: theme.width * 2,
	},
	details: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
	},
	user_image: {
		width: 45,
		height: 45,
	},
	cash: {
		fontSize: 35,
		color: theme.color.primaryText,
		fontWeight: "bold",
	},
	wallet_text: {
		fontSize: theme.font.regular,
		color: theme.color.primaryText,
	},
	topup: {
		flex: 1,
		paddingVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		borderColor: theme.color.primary,
		borderWidth: 3,
		marginRight: 5,
	},
	withdraw: {
		flex: 1,
		paddingVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		backgroundColor: theme.color.primary,
		borderColor: theme.color.primary,
		marginLeft: 5,
		borderWidth: 3,
	},
	topup_text: {
		fontSize: theme.font.small,
		fontWeight: "bold",
		color: theme.color.primary,
	},
	withdraw_text: {
		fontSize: theme.font.small,
		fontWeight: "bold",
		color: theme.color.background,
	},
	title: {
		fontSize: theme.font.big,
		fontWeight: "bold",
		color: theme.color.primaryText,
	},
	transactions: {
		marginTop: 20,
	},
	transaction: {
		marginVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-between",
	},
	transaction_info: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 65,
		height: 65,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 20,
	},
	info_title: {
		color: theme.color.primaryText,
		fontSize: theme.font.regular,
	},
	info_description: {
		color: theme.color.secondaryText,
		fontSize: theme.font.small,
	},
	money: {
		color: theme.color.primaryText,
		fontSize: theme.font.regular,
		fontWeight: "bold",
	},
	info: {},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: theme.width,
		height: theme.height,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.8)",
	},
	topup_modal: {
		marginTop: -50,
		width: theme.width * 0.75,
		borderRadius: 25,
		backgroundColor: theme.color.card,
		padding: 20,
	},
	withdraw_modal: {
		marginTop: -50,
		width: theme.width * 0.75,
		borderRadius: 25,
		backgroundColor: theme.color.card,
		padding: 20,
	},
	cross: {
		position: "absolute",
		top: 20,
		left: 20,
		width: 30,
		height: 30,
	},
	modal_title: {
		position: "absolute",
		top: 20,
		left: "45%",
		color: theme.color.primaryText,
		fontSize: theme.font.regular,
		fontWeight: "bold",
	},
	inputs: {
		marginVertical: 40,
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
	button: {
		width: "100%",
		padding: 20,
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
	logout_text: {
		color: theme.color.primary,
		fontSize: theme.font.small,
	},
});
