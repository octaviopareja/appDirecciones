import React, { useState, useCallback } from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants'
import { addPlace } from '../store/places.action';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState();

    const onHandlerTitle = text => setTitle(text);
    const onHandlerImage = path => setSelectedImage(path);

    const onHandlerSave = () => {
        dispatch(addPlace(title, selectedImage, selectedLocation));
        navigation.goBack();
    }

    const onHandlerLocationPicked = useCallback(location => {
        setSelectedLocation(location);
    }, [setSelectedLocation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onHandlerTitle}
                    value={title}
                />
                <ImageSelector onImage={onHandlerImage} />
                <LocationPicker
                    navigation={navigation}
                    route={route}
                    onLocationPicked={onHandlerLocationPicked}
                />
                <View style={styles.footer}>
                    <Button
                        title="Grabar Dirección"
                        color={COLORS.MAROON}
                        onPress={onHandlerSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    footer: {
        marginTop: 30,
    }
})

export default NewPlaceScreen
