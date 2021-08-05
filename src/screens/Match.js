import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../lib/theme";
import { SharedElement } from "react-navigation-shared-element";
import maps from "../lib/maps";
export default function Match({ route, navigation }) {
	const { item } = route.params;
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.pop()} style={styles.back}>
				<Ionicons
					name="chevron-back"
					size={30}
					color={theme.color.primaryText}
				/>
			</TouchableOpacity>
			<View style={styles.top}>
				<View style={styles.prize_wrapper}>
					<View style={styles.prize}>
						<Image
							source={require("../../assets/first.png")}
							style={styles.prize_image}
						/>
						<Text style={styles.prize_text}>৳{item.first}</Text>
					</View>
					<View style={styles.prize}>
						<Image
							source={require("../../assets/second.png")}
							style={styles.prize_image}
						/>
						<Text style={styles.prize_text}>৳{item.second}</Text>
					</View>
					<View style={styles.prize}>
						<Image
							source={require("../../assets/third.png")}
							style={styles.prize_image}
						/>
						<Text style={styles.prize_text}>৳{item.third}</Text>
					</View>
					<View style={styles.prize}>
						<Image
							source={require("../../assets/kill.png")}
							style={styles.kill_image}
						/>
						<Text style={styles.kill_text}>৳{item.kill}/kill</Text>
					</View>
				</View>
				<View style={styles.image_wrapper}>
					<SharedElement id={`item.${item.id}.image`}>
						<Image source={maps[item.map]} style={styles.image} />
					</SharedElement>
				</View>
			</View>
			<View style={styles.details}>
				<SharedElement style={styles.title} id={`item.${item.id}.title`}>
					<Text style={styles.titleText}>{item.title}</Text>
				</SharedElement>
				<Text style={styles.description} id={`item.${item.id}.description`}>
					{item.description}
				</Text>
				<View style={styles.info}>
					<SharedElement id={`item.${item.id}.time`} style={styles.time}>
						<View style={styles.time}>
							<Ionicons
								name="time"
								size={22}
								color={theme.color.secondaryText}
							/>
							<Text style={styles.timeText}>{item.time}</Text>
						</View>
					</SharedElement>
					<SharedElement id={`item.${item.id}.date`}>
						<View style={styles.time}>
							<Ionicons
								name="calendar"
								size={22}
								color={theme.color.secondaryText}
							/>
							<Text style={styles.timeText}>{item.date}</Text>
						</View>
					</SharedElement>
				</View>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => alert("Sorry, You have insufficient funds!")}
			>
				<Text style={styles.buttonText}>Join The Game - ৳{item.fee}</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.color.background,
		padding: 20,
	},
	back: {
		position: "absolute",
		top: 20,
		left: 20,
	},
	top: {
		paddingTop: 50,
		flexDirection: "row",
	},
	prize_wrapper: { flex: 1, justifyContent: "center" },
	prize: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	prize_image: {
		width: 20,
		height: 30,
	},
	kill_image: {
		width: 25,
		height: 25,
	},
	prize_text: {
		fontSize: theme.font.small,
		color: theme.color.tertiary,
		padding: 10,
	},
	kill_text: {
		fontSize: theme.font.small,
		color: theme.color.secondary,
		padding: 10,
	},
	image_wrapper: { flex: 1 },
	image: {
		width: 300,
		height: 300,
		borderRadius: 200,
	},
	details: {
		flexGrow: 1,
		paddingTop: 20,
	},
	titleText: {
		color: theme.color.primaryText,
		fontSize: theme.font.regular,
		lineHeight: 35,
		fontWeight: "bold",
	},
	description: {
		fontSize: theme.font.small,
		color: theme.color.secondaryText,
		marginVertical: 10,
		lineHeight: 30,
	},
	info: {
		flexDirection: "row",
	},
	time: {
		marginRight: 20,
		flexDirection: "row",
	},
	timeText: {
		color: theme.color.secondaryText,
		fontSize: theme.font.small,
	},
	button: {
		width: "100%",
		padding: 15,
		borderRadius: 50,
		borderColor: theme.color.primary,
		borderWidth: 3,
	},
	buttonText: {
		color: theme.color.primary,
		textAlign: "center",
		fontSize: theme.font.regular,
		fontWeight: "bold",
	},
});
