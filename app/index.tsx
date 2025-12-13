import {View, StyleSheet, Pressable, Text} from "react-native"
import {CameraView} from "expo-camera"
import {useRef} from "react"
import {useAppDispatch, useAppSelector} from "@/store/hooks"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import {cycleCameraFacing, cycleCameraFlash, cycleCameraMode, enableTorch} from "@/store/cameraSlice"
import {FlashIcon} from "@/components/FlashIcon";
import {ShutterButton} from "@/components/ShutterButton";

export default function Index() {
  const cameraRef = useRef<CameraView | null>(null)
  const perms = useAppSelector((s) => s.permissions)
  const dispatch = useAppDispatch()
  const {facing, flash, mode, torch, flashDisabled} = useAppSelector((s) => s.camera)

  if (perms.camera !== "granted") {
    return <View/>
  }

  function toggleCamera() {
    dispatch(cycleCameraFacing())
  }

  function toggleFlash() {
    if (mode === "video") {
      dispatch(enableTorch())
    } else {
      dispatch(cycleCameraFlash())
    }
  }

  function toggleCameraMode() {
    dispatch(cycleCameraMode())
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      console.log(photo.uri)
    }
  }


  return (
    <View style={styles.container}>
      {/* Camera preview */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode={mode}
        flash={flash}
        enableTorch={torch}
      />

      <View style={styles.topOverlay} />
      <View style={styles.bottomOverlay} />

      {/* Flash toggle button */}
      <Pressable onPress={toggleFlash} style={styles.flashButton} disabled={flashDisabled}>
        <FlashIcon />
      </Pressable>

      {/* Mode slider above shutter */}
      <View style={styles.modeSlider}>
        <Pressable onPress={toggleCameraMode}>
          <Text
            style={[
              styles.modeText,
              mode === "picture" && styles.modeActive,
            ]}
          >
            PHOTO
          </Text>
        </Pressable>

        <Pressable onPress={toggleCameraMode}>
          <Text
            style={[
              styles.modeText,
              mode === "video" && styles.modeActive,
            ]}
          >
            VIDEO
          </Text>
        </Pressable>
      </View>

      {/* Bottom camera controls  */}
      <View style={styles.bottomControls}>
        {/* Spacer */}
        <View style={{ width: 48 }} />

        {/* Shutter button */}
        <Pressable
          onPress={takePicture}
          style={({ pressed }) => [
            styles.shutter,
            pressed && styles.shutterPressed,
          ]}
        >
          {({ pressed }) => <ShutterButton pressed={pressed} />}
        </Pressable>

        {/* Camera facing toggle */}
        <Pressable onPress={toggleCamera} style={styles.icon}>
          <MaterialIcons name="flip-camera-android" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  flashButton: {
    position: "absolute",
    top: 64,
    right: 16,
    zIndex: 10,
    padding: 10,
    borderRadius: 24,
  },
  shutterPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  bottomControls: {
    position: "absolute",
    bottom: 64,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    zIndex: 10,
  },
  modeSlider: {
    position: "absolute",
    bottom: 170,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    zIndex: 10,
  },
  modeText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  modeActive: {
    color: "white",
    fontWeight: "700",
    backgroundColor: "#333333",
  },
  shutter: {
    zIndex: 10,
    borderRadius: 40,
  },
  icon: {
    padding: 10,
    borderRadius: 24,
  },
})
