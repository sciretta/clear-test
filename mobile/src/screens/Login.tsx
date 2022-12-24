import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { graphql, useMutation } from "react-relay";

const LoginMutation = graphql`
  mutation LoginMutation($username: String!) {
    loginUser(user: { username: $username }) {
      username
      id
    }
  }
`;

export const USER: { username: string; id: string } = {
  username: "",
  id: "",
};

export default function Login(): JSX.Element {
  const navigation = useNavigation();
  const [commitMutation, isMutationInFlight] = useMutation(LoginMutation);
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.input}
        onChangeText={(text) => setUsername(text)}
        placeholder="enter your username"
      />
      <Button
        title="LOGIN"
        loading={isMutationInFlight}
        containerStyle={styles.button}
        onPress={() =>
          username &&
          commitMutation({
            variables: {
              username,
            },
            onCompleted: (res: {
              loginUser: { username: string; id: string };
            }) => {
              if (res?.loginUser?.username) {
                USER.username = res.loginUser.username.trim();
                USER.id = res.loginUser.id;
                navigation.navigate("Home", {
                  username: res?.loginUser?.username,
                  id: res?.loginUser?.id,
                });
              }
            },
          })
        }
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
  input: {
    width: 200,
  },
  button: {
    width: 200,
  },
});
