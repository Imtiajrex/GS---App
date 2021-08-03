import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../lib/theme";
import { Image } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Results() {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.cross}>
				<Ionicons
					name="chevron-back"
					size={30}
					color={theme.color.primaryText}
				/>
			</TouchableOpacity>
			<Text style={styles.title}>Results</Text>
			<User
				image={require("../../assets/user.png")}
				name="@shawnmendes"
				kill={15}
				assist={7}
				rank={1}
			/>
		</View>
	);
}
const User = ({ image, name, kill, assist, rank }) => (
	<View style={styles.result}>
		<View style={styles.details}>
			<Image source={image} style={styles.image} />
			<View style={styles.user_details}>
				<Text style={styles.user_name}>{name}</Text>
				<View style={styles.game_details}>
					<View style={styles.detail_wrapper}>
						<MaterialCommunityIcons
							name="target"
							size={24}
							color={theme.color.secondaryText}
						/>
						<Text style={styles.kill}>{kill} kills</Text>
					</View>
					<View style={{ ...styles.detail_wrapper, paddingHorizontal: 10 }}>
						<Ionicons
							name="people-outline"
							size={24}
							color={theme.color.secondaryText}
						/>
						<Text style={styles.assist}>{assist} assists</Text>
					</View>
				</View>
			</View>
		</View>
		<View style={styles.rank_wrapper}>
			<Text style={styles.rank}>#{rank}</Text>
		</View>
	</View>
);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.color.background,
		padding: 20,
		paddingTop: 100,
	},
	cross: {
		position: "absolute",
		top: 20,
		left: 20,
		width: 30,
		height: 30,
	},
	title: {
		position: "absolute",
		top: 20,
		right: 20,
		textAlign: "right",
		fontSize: theme.font.big,
		color: theme.color.primaryText,
		fontWeight: "bold",
	},
	result: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	details: {
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 75,
		height: 75,
		borderRadius: 15,
	},

	user_details: {
		paddingHorizontal: 10,
		justifyContent: "space-between",
	},
	user_name: {
		fontSize: theme.font.regular,
		color: theme.color.primaryText,
	},
	game_details: {
		flexDirection: "row",
		paddingTop: 10,
	},
	kill: {
		fontSize: theme.font.small,
		color: theme.color.secondaryText,
	},
	assist: {
		fontSize: theme.font.small,
		color: theme.color.secondaryText,
	},
	rank_wrapper: {
		borderRadius: 20,
		backgroundColor: "rgba(37,212,223,0.2)",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	rank: {
		fontSize: theme.font.small,
		fontWeight: "bold",
		color: theme.color.tertiary,
		textAlign: "center",
	},
	detail_wrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
});
