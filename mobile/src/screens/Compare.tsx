import { Image } from "@rneui/themed";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

export default function Compare({ route }): JSX.Element {
  return (
    <View style={styles.container}>
      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height * 0.5}
        imageWidth={Dimensions.get("window").width}
        imageHeight={Dimensions.get("window").height * 0.5}
        // eslint-disable-next-line
        style={{ borderWidth: 1, borderColor: "black" }}
      >
        <Image
          containerStyle={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.5,
          }}
          source={{
            uri: route?.params?.firstImage,
          }}
        />
      </ImageZoom>
      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height * 0.5}
        imageWidth={Dimensions.get("window").width}
        imageHeight={Dimensions.get("window").height * 0.5}
        // eslint-disable-next-line
        style={{ borderWidth: 1, borderColor: "black" }}
      >
        <Image
          containerStyle={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.5,
          }}
          source={{
            uri: route?.params?.secondImage,
          }}
        />
      </ImageZoom>
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
});
