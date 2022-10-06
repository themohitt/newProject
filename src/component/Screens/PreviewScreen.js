import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useState } from "react";
import React, { useRef } from "react";
import { pixelNormalize } from "../Constants/Size";

const Preview = (props) => {
  const [input, setInput] = useState("");

  const images = [
    {
      id: 1,
      img: require("../assets/Images/GroupOne/Gaming.jpg"),
      color: "#e8ab1c",
    },
    {
      id: 2,
      img: require("../assets/Images/GroupTwo/Reactor.jpg"),
      color: "#e8ab1c",
    },
    {
      id: 3,
      img: require("../assets/Images/GroupThree/Listening.jpg"),
      color: "#e8ab1c",
    },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;

  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 380;
  return (
    <View style={styles.mainContainer}>
      <StatusBar style="light" />

      <ScrollView style={styles.container}>
        <View style={{alignItems:'center'}}>
          <Image source={require("../assets/Images/Discord.png")} 
          style={{
          width: pixelNormalize(112),
          height: pixelNormalize(83),
          marginTop:pixelNormalize(64), 
          marginBottom:pixelNormalize(60)
          }} 
          />
        
        <View style={styles.textAreaContainer}>
          {images.map((image, imageIndex) => {
            const inputRange = [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ];
            return (
              <Animated.Text
                style={[
                  styles.textView,
                  {
                    transform: [
                      {
                        translateY: scrollX.interpolate({
                          inputRange,
                          outputRange: [-380, -100, 0],
                        }),
                      },
                    ],
                  },
                  {
                    opacity: scrollX.interpolate({
                      inputRange,
                      outputRange: [1, 1, 1],
                    }),
                  },
                  {
                    color: image.color,
                  },
                ]}
              >
                {image.title}
              </Animated.Text>
            );
          })}
        </View>
        
        <View style={[styles.scrollContainer, { height: windowHeight }]}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {images.map((image, imageIndex) => {
              return (
                <Animated.View style={{ width: windowWidth }} key={imageIndex}>
                  <Image source={image.img} style={styles.card} />
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: "#141414",
            justifyContent: "center",
            alignItems: "center",
            width: pixelNormalize(354),
            height: pixelNormalize(290),
            borderRadius:pixelNormalize(50),
          }}
        >
          <Text style={styles.Text}>
            Let's connect with your friends
          </Text>
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  style={[
                    styles.normalDots,
                    { width },
                    { backgroundColor: image.color },
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.containerThree}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={() =>
                props.navigation.navigate("Chat", { username: input })
              }
            >
              <Text style={styles.textContainer}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
      {/* <View style={styles.containerThree}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => props.navigation.navigate("Chat", { username: input })}
        >
          <Text style={styles.textContainer}>Start Chatting</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
export default Preview;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#000000",
  },
  textContainer: {
    fontFamily: "open-sans-bold",
    fontSize: pixelNormalize(20),
    color: "black",
    textAlign: "center",
    
  },
  containerThree: {
    justifyContent: "center",
    alignItems: "center",
    //
  },
  touchableContainer: {
    backgroundColor: "#e8ab1c",
    // marginTop:pixelNormalize(30),
    // padding: pixelNormalize(15),
    borderRadius: pixelNormalize(20),
    width: pixelNormalize(294),
    height: pixelNormalize(70),
    justifyContent: "center",
  },
  container: {
  },
  scrollContainer: {
    shadowColor: "black",
    shadowOffset: {},
    shadowOpacity: 1, 
    marginBottom:pixelNormalize(60) 
  },
  card: {
    flex: 1,
    marginVertical: pixelNormalize(10),
    width: pixelNormalize(302),
    height: pixelNormalize(264),
    overflow: "hidden",
    alignSelf: "center",
    borderRadius: pixelNormalize(30),
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: pixelNormalize(36),
    height: pixelNormalize(10),
    marginBottom: pixelNormalize(30),
  },
  normalDots: {
    width: pixelNormalize(8),
    height: pixelNormalize(8),
    borderRadius: pixelNormalize(4),
    marginHorizontal: pixelNormalize(4),
    justifyContent: "center",
  },
  textAreaContainer: {
    marginBottom: pixelNormalize(10),
  },
  textView: {
    position: "absolute",
    fontSize: pixelNormalize(22),
    fontWeight: "600",
    textAlign: "center",
  },
  Text: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: pixelNormalize(25),
    alignItems: "center",
    justifyContent: "center",
    width: pixelNormalize(260),
    height: pixelNormalize(66),
    marginBottom:pixelNormalize(33)
  },
});