/* eslint-disable react-native/no-color-literals */
import { useIsFocused } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import React, { Suspense, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from "react-relay";
import { graphql, OperationType } from "relay-runtime";
import { USER } from "screens/Login";
import backEnd from "utils/backEnd.json";

const GetUserImagesQuery = graphql`
  query GalleryGetUserImagesQuery($data: UserInput!) {
    userImages(user: $data) {
      fileName
      ownerUsername
    }
  }
`;

function Loading() {
  return <Text>loading gallery...</Text>;
}

export default function Gallery({
  setSelectedImages,
  selectedImages,
}: {
  setSelectedImages: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedImages: Array<string>;
}): JSX.Element {
  const [queryReference, loadQuery] = useQueryLoader(GetUserImagesQuery);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) return;
    loadQuery(
      {
        data: {
          username: USER.username.trim(),
        },
      },
      { fetchPolicy: "network-only" }
    );
  }, [isFocused, loadQuery]);

  return (
    <Suspense fallback={<Loading />}>
      <ScrollView style={styles.container}>
        {queryReference && (
          <GalleryContent
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            queryReference={queryReference}
          />
        )}
      </ScrollView>
    </Suspense>
  );
}

function GalleryContent({
  queryReference,
  selectedImages,
  setSelectedImages,
}: {
  queryReference: PreloadedQuery<OperationType, Record<string, unknown>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedImages: Array<string>;
}): JSX.Element {
  const data = usePreloadedQuery(GetUserImagesQuery, queryReference);

  if (!data?.userImages?.length) return <Text>No images to show</Text>;

  return (
    <FlatList
      data={data.userImages.map(
        (image: { fileName: string }) =>
          `http://${backEnd.url}/files/${image.fileName}`
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item}
          onPress={() => {
            if (selectedImages.includes(item)) {
              setSelectedImages((prev) => [
                ...prev.filter((prevItem) => item !== prevItem),
              ]);
              return;
            }
            if (selectedImages.length === 2) {
              setSelectedImages((prev) => [prev[1], item]);
              return;
            }
            setSelectedImages((prev) => [...prev, item]);
          }}
        >
          <Image
            source={{ uri: item }}
            style={
              selectedImages.includes(item)
                ? styles.imageSelected
                : styles.image
            }
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableOpacity>
      )}
      // Setting the number of column
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    width: "100%",
    backgroundColor: "transparent",
  },
  imageSelected: {
    width: Dimensions.get("window").width / 3,
    height: 150,
    backgroundColor: "rgba(255, 255, 255,0.6)",
    borderWidth: 2,
    borderColor: "green",
  },
  image: {
    width: Dimensions.get("window").width / 3,
    height: 150,
    backgroundColor: "transparent",
  },
});
