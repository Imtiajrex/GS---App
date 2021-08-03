import React from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	SafeAreaView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import theme from "../lib/theme";
import { SharedElement } from "react-navigation-shared-element";
const category = ["All", "Solo", "Duo", "Squad"];
const items = [
	{
		title: "Free fire Foundation map game",
		time: "8:00pm",
		first: "850",
		second: "500",
		third: "250",
		kill: "25",
		description:
			"Fight till you're the last person left to win the match. For every kill you'll get a reward. And Ranking in top three will also get you reward",
		map: require("../image/_Kalahari.png"),
		id: 1,
	},
	{
		title: "Free fire confinement map game",
		time: "8:00pm",
		first: "850",
		second: "500",
		third: "250",
		kill: "25",
		map: require("../image/Confinement.png"),
		description:
			"Fight till you're the last person left to win the match. For every kill you'll get a reward. And Ranking in top three will also get you reward",
		id: 2,
	},
];
export default function Home({ navigation }) {
	const [activeCategory, setCategory] = useState("All");
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={category}
				keyExtractor={(_, index) => index.toString()}
				contentContainerStyle={styles.category_wrapper}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.category}
						onPress={() => setCategory(item)}
					>
						<Text
							style={{
								...styles.category_text,
								color:
									activeCategory == item
										? theme.color.primary
										: theme.color.secondaryText,
							}}
						>
							{item}
						</Text>
					</TouchableOpacity>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
			<FlatList
				data={items}
				keyExtractor={(_, index) => index.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToInterval={theme.width}
				decelerationRate={"fast"}
				renderItem={({ item }) => (
					<View style={styles.match_wrapper}>
						<TouchableWithoutFeedback
							onPress={() => navigation.navigate("Match", { item })}
						>
							<View style={styles.match}>
								<SharedElement
									id={`item.${item.id}.image`}
									style={styles.match_image}
								>
									<Image source={item.map} style={styles.match_image} />
								</SharedElement>
								<View style={styles.details}>
									<SharedElement
										id={`item.${item.id}.title`}
										style={styles.title}
									>
										<Text style={styles.titleText}>{item.title}</Text>
									</SharedElement>
									<SharedElement
										id={`item.${item.id}.time`}
										style={styles.time}
									>
										<Text style={styles.timeText}>
											<Ionicons
												name="time"
												size={22}
												color={theme.color.secondaryText}
											/>
											{item.time}
										</Text>
									</SharedElement>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.color.background,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	title: {
		color: theme.color.primaryText,
		fontSize: theme.font.big,
		padding: 20,
		fontWeight: "bold",
		width: "100%",
		textAlign: "center",
	},
	category_wrapper: {
		width: "100%",
		padding: 20,
		justifyContent: "center",
	},
	category: { padding: 10, paddingHorizontal: 30 },
	category_text: {
		color: theme.color.primaryText,
		fontSize: theme.font.regular,
	},
	match_wrapper: {
		width: theme.width,
		justifyContent: "center",
		alignItems: "center",
	},
	match: {
		width: 320,
		height: 460,
		padding: 20,
		borderRadius: 35,
		backgroundColor: theme.color.card,
		alignItems: "center",
	},
	match_image: {
		width: 230,
		height: 230,
		borderRadius: 200,
	},
	details: {
		flexDirection: "row",
		width: "100%",
		flexGrow: 1,
		alignItems: "center",
	},
	title: {
		width: "60%",
	},
	time: {
		width: "40%",
		alignItems: "center",
	},
	titleText: {
		color: theme.color.primaryText,
		fontSize: theme.font.regular,
		lineHeight: 35,
	},
	timeText: {
		color: theme.color.secondaryText,
		fontSize: theme.font.small,
		textAlign: "right",
	},
});
