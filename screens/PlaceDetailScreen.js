import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PlaceDetailScreen = ({ route, navigation }) => {
  const { title, address, image } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{address}</Text>
      {!image ? (
        <Text>No hay imagen para mostrar...</Text>
      ) : (
        <Image style={styles.image} source={{ uri: image }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: "green",
    paddingBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PlaceDetailScreen;
