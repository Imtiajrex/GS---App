import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import theme from "../lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import { useState } from "react";
export default function Profile({ navigation }) {
	const [topup, setTopup] = useState(false);
	const [withdraw, setWithdraw] = useState(false);
	return (
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.top}>
				<View style={{ ...styles.details, marginBottom: 40 }}>
					<Text style={styles.title}>Hi, Salman</Text>
					<Image
						source={require("../../assets/user.png")}
						style={styles.user_image}
					/>
				</View>
				<View style={styles.details}>
					<Text style={styles.wallet_text}>My Wallet</Text>
					<Text style={styles.cash}>৳2500</Text>
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
					<View style={styles.transaction}>
						<View style={styles.transaction_info}>
							<View
								style={{
									...styles.icon,
									backgroundColor: "rgba(37,212,223,0.2)",
								}}
							>
								<Ionicons
									name="gift"
									size={35}
									color={theme.color.tertiary}
									style={{ opacity: 1 }}
								/>
							</View>
							<View style={styles.info}>
								<Text style={styles.info_title}>1st prize</Text>
								<Text style={styles.info_description}>Kalahari game</Text>
							</View>
						</View>
						<Text style={styles.money}>৳2000+</Text>
					</View>
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
const Topup = ({ setTopup }) => (
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
			<Text style={styles.modal_title}>Top up</Text>
			<View style={styles.inputs}>
				<TextInput
					placeholder="Transaction ID"
					style={styles.input}
					placeholderTextColor="#2A3849"
				/>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.button_text}>Recharge Account</Text>
				</TouchableOpacity>
			</View>
		</MotiView>
	</MotiView>
);
const Withdraw = ({ setWithdraw }) => (
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
			<TouchableOpacity style={styles.close} onPress={() => setWithdraw(false)}>
				<Ionicons name="close" size={25} color={theme.color.primaryText} />
			</TouchableOpacity>
			<Text style={styles.modal_title}>Withdraw</Text>
			<View style={styles.inputs}>
				<TextInput
					placeholder="Bkash Account Number"
					style={styles.input}
					placeholderTextColor="#2A3849"
				/>
				<TextInput
					placeholder="Amount"
					style={styles.input}
					placeholderTextColor="#2A3849"
				/>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.button_text}>Recharge Account</Text>
				</TouchableOpacity>
			</View>
		</MotiView>
	</MotiView>
);
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.color.background },
	top: { backgroundColor: theme.color.card, padding: 20, paddingBottom: 60 },
	transaction_wrapper: { position: "relative", padding: 20, paddingTop: 0 },
	ball: {
		width: theme.width * 2,
		height: theme.width * 2,
		position: "absolute",
		top: "-44%",
		transform: [{ translateX: -theme.width / 2 }],
		backgroundColor: theme.color.background,
		borderRadius: theme.width,
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
		textAlign: "center",
		borderRadius: 50,
		fontSize: theme.font.regular,
		color: theme.color.primaryText,
		backgroundColor: theme.color.background,
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
});
