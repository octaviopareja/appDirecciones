import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { COLORS } from "../constants";
import MapPreview from "./MapPreview";

const LocationPicker = ({ navigation, pickedLocation, setPickedLocation }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos insuficientes",
          "Necesita dar permisos de localización para la app",
          [{ text: "Ok" }]
        );
      }
    })();
  }, []);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "No se pudo obtener la localización",
        "Por favor intente nuevamente.",
        [{ text: "Ok" }]
      );
    } finally {
      setIsFetching(false);
    }
  };

  const pickLocationHandler = () => navigation.push("Map");

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={COLORS.DARK_MAIN} />
        ) : (
          <Text>En proceso...</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Obtener Ubicación"
          color={COLORS.LITTLE_ORANGE}
          onPress={getLocationHandler}
        />
        <Button
          title="Elegir Ubicación"
          color={COLORS.LIGTH_ORANGE}
          onPress={pickLocationHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginVertical: 15,
  },
  mapPreview: {
    borderWidth: 1,
    borderColor: COLORS.LITTLE_ORANGE,
    marginBottom: 10,
    width: "100%",
    height: 150,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
