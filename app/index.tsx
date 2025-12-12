import {View, StyleSheet, Pressable, StatusBar, Platform} from "react-native";
import {CameraType, CameraView, FlashMode} from "expo-camera";
import {useRef, useState} from "react";
import {useAppSelector} from "@/store/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const perms = useAppSelector((s) => s.permissions);
  const FLASH_MODE: FlashMode[] = ["on", "off", "auto"]

  if (perms.camera !== "granted") {
    return <View/>;
  }

  function toggleCamera() {
    setFacing((c: CameraType) => (c === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((prev: FlashMode) => {
        const index = FLASH_MODE.indexOf(prev)
        return FLASH_MODE[(index+1) % FLASH_MODE.length]
      }
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      console.log(photo.uri)
    }
  }

  const androidStatusBarProps =
    Platform.OS === "android" ? {translucent: true, backgroundColor: "transparent"} : {};

  const FlashIcon = () => {
    if (flash === "on") {
      return <MaterialIcons name="flash-on" size={28} color="white"/>

    } else if (flash === "auto") {
      return <MaterialIcons name="flash-auto" size={28} color="white"/>

    } else {
      return <MaterialIcons name="flash-off" size={28} color="white"/>
    }

  }
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" {...androidStatusBarProps} />
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          flash={flash}
        />

        <View style={styles.buttonContainer}>
          {/* Toggle Camera button */}
          <Pressable onPress={toggleCamera} style={styles.icon}>
            <MaterialIcons name="flip-camera-android" size={28} color="white"/>
          </Pressable>

          {/* Shutter Button */}
          <Pressable onPress={takePicture} style={styles.icon}>
            <MaterialIcons name="circle" size={64} color="white"/>
          </Pressable>

          {/* Flash Button */}
          <Pressable onPress={toggleFlash} style={styles.icon}>
            <FlashIcon/>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "black"
  }
  ,
  container: {
    flex: 1,
    backgroundColor: "black"
  }
  ,
  camera: {
    flex: 1,
    width: "100%",
  }
  ,
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
  }
  ,
  icon: {
    padding: 8
  }
  ,
});
