import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({
      quality: 1,
    });

    navigation.navigate("StayingArea", {
      photo,
    });
  };

  if (hasPermission === null) return <View />;

  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        ratio="4:3"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height,
          width: "100%",
        }}
        type={type}
      />
      <Button
        containerStyle={styles.button}
        onPress={() =>
          setType(type === CameraType.back ? CameraType.front : CameraType.back)
        }
        title={type === CameraType.back ? "Front Camera" : "Back Camera"}
      />
      <Button
        containerStyle={styles.button}
        onPress={takePicture}
        title="Take a picture"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginVertical: 3,
  },
});
