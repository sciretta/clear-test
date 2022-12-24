import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Gallery from "screens/components/Gallery";

export default function Home(): JSX.Element {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <View style={styles.container}>
      <Gallery
        setSelectedImages={
          setSelectedImages as React.Dispatch<
            React.SetStateAction<Array<string>>
          >
        }
        selectedImages={selectedImages}
      />
      <View style={styles.buttonsContainer}>
        <Button
          disabled={selectedImages.length !== 2}
          containerStyle={styles.button}
          title={selectedImages.length !== 2 ? "Select images" : "Compare"}
          onPress={() =>
            navigation.navigate("Compare", {
              firstImage: selectedImages[0],
              secondImage: selectedImages[1],
            })
          }
        />
        <Button
          containerStyle={styles.button}
          title="New Image"
          onPress={() => navigation.navigate("Camera")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginVertical: 3,
  },
  buttonsContainer: {
    height: Dimensions.get("window").height * 0.15,
    justifyContent: "center",
  },
});
