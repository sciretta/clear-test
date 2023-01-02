/* eslint-disable react-native/no-color-literals */
import { useIsFocused } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import React, { Suspense, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  PreloadedQuery,
  useMutation,
  UseMutationConfig,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import {
  Disposable,
  graphql,
  MutationParameters,
  OperationType,
} from "relay-runtime";
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

const DeleteImageMutation = graphql`
  mutation GalleryDeleteImageMutation($fileName: String!) {
    deleteImage(fileName: $fileName)
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
  const [deleteMutation, isMutationInFlight] = useMutation(DeleteImageMutation);

  useEffect(() => {
    if (!isFocused || isMutationInFlight) return;
    loadQuery(
      {
        data: {
          username: USER.username.trim(),
        },
      },
      { fetchPolicy: "network-only" }
    );
  }, [isFocused, loadQuery, isMutationInFlight]);

  return (
    <Suspense fallback={<Loading />}>
      {queryReference && (
        <GalleryContent
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          queryReference={queryReference}
          deleteMutation={deleteMutation}
        />
      )}
    </Suspense>
  );
}

function GalleryContent({
  queryReference,
  selectedImages,
  setSelectedImages,
  deleteMutation,
}: {
  queryReference: PreloadedQuery<OperationType, Record<string, unknown>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedImages: Array<string>;
  deleteMutation: (config: UseMutationConfig<MutationParameters>) => Disposable;
}): JSX.Element {
  const data = usePreloadedQuery(GetUserImagesQuery, queryReference);

  if (!data?.userImages?.length) return <Text>No images to show</Text>;

  return (
    <FlatList
      style={styles.container}
      data={data.userImages.map(
        (image: { fileName: string }) =>
          `http://${backEnd.url}/files/${image.fileName}`
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item}
          onLongPress={() =>
            Alert.alert("Delete image", "Do you want to delete this image?", [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  deleteMutation({
                    variables: {
                      fileName: item.split("/")[item.split("/").length - 1],
                    },
                  });
                  setSelectedImages([]);
                },
              },
            ])
          }
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
