import { useNavigation } from "@react-navigation/native";
import { Button, Image } from "@rneui/themed";
import mime from "mime";
import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { USER } from "screens/Login";
import backEnd from "utils/backEnd.json";

export default function ImageStayingArea({ route }): JSX.Element {
  const navigation = useNavigation();

  const save = (image, name: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri:
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", ""),
      type: mime.getType(image.uri) as string,
      name,
    });

    fetch(`http://${backEnd.url}/upload`, {
      method: "POST",
      body: formData,
    }).finally(() => {
      navigation.navigate("Home");
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: route?.params?.photo?.uri }} style={styles.image} />
      <Button
        containerStyle={styles.button}
        title="Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        containerStyle={styles.button}
        title="Load image"
        onPress={() => save(route?.params?.photo, USER.username)}
      />
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
  // eslint-disable-next-line react-native/no-color-literals
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.75,
    backgroundColor: "transparent",
  },
});
