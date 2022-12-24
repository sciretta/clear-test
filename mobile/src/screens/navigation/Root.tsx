import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { enableScreens } from "react-native-screens";
import Camera from "screens/Camera";
import Compare from "screens/Compare";
import Home from "screens/Home";
import ImageStayingArea from "screens/ImageStayingArea";
import Login from "screens/Login";
import { RootParamList } from "screens/navigation/types";

enableScreens();

const Root = createStackNavigator<RootParamList>();

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer<RootParamList>>
      <Root.Navigator initialRouteName="Login">
        <Root.Screen name="Login" component={Login} />
        <Root.Screen name="Compare" component={Compare} />
        <Root.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => null,
          }}
        />
        <Root.Screen name="Camera" component={Camera} />
        <Root.Screen
          name="StayingArea"
          component={ImageStayingArea}
          options={{
            title: "Stage Area",
            headerLeft: () => null,
          }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}
