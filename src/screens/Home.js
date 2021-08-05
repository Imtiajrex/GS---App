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
import firebase from "firebase";
import { useEffect } from "react";
import maps from "../lib/maps";
import AnimatedLottieView from "lottie-react-native";
const category = ["All", "Solo", "Duo", "Squad"];
export default function Home({ navigation }) {
	const [activeCategory, setCategory] = useState("All");
	const [items, setItems] = useState([]);
	useEffect(() => {
		firebase
			.firestore()
			.collection("Match")
			.onSnapshot((snapshot) => {
				setItems(
					snapshot.docs.map((doc) => {
						return doc.data();
					})
				);
			});
	}, []);
	useEffect(() => {
		if (activeCategory != "All")
			firebase
				.firestore()
				.collection("Match")
				.where("type", "==", activeCategory)
				.onSnapshot((snapshot) => {
					setItems(
						snapshot.docs.map((doc) => {
							return doc.data();
						})
					);
					console.log(
						snapshot.docs.map((doc) => {
							return doc.data();
						})
					);
				});
		else
			firebase
				.firestore()
				.collection("Match")
				.onSnapshot((snapshot) => {
					setItems(
						snapshot.docs.map((doc) => {
							return doc.data();
						})
					);
				});
	}, [activeCategory]);
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
			{items.length > 0 ? (
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
										<Image source={maps[item.map]} style={styles.match_image} />
									</SharedElement>
									<View style={styles.details}>
										<SharedElement
											id={`item.${item.id}.title`}
											style={styles.title}
										>
											<Text style={styles.titleText}>{item.title}</Text>
										</SharedElement>
										<View style={styles.extra_info}>
											<SharedElement id={`item.${item.id}.time`}>
												<View style={styles.time}>
													<Text style={styles.timeText}>
														<Ionicons
															name="time"
															size={22}
															color={theme.color.secondaryText}
														/>
														{item.time}
													</Text>
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
								</View>
							</TouchableWithoutFeedback>
						</View>
					)}
				/>
			) : (
				<View style={styles.info}>
					<AnimatedLottieView
						autoPlay={true}
						style={{
							width: 200,
							height: 200,
							backgroundColor: theme.color.background,
							marginVertical: 20,
						}}
						source={require("../../assets/sorry.json")}
					/>
					<Text style={styles.info_text}>No Active Matches</Text>
				</View>
			)}
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
	info: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
	},
	info_text: {
		fontSize: theme.font.big,
		color: theme.color.primaryText,
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
	extra_info: {
		width: "40%",
		alignItems: "center",
	},
	time: { alignItems: "center", flexDirection: "row", marginVertical: 5 },
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
