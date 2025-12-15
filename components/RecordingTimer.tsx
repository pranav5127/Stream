import {useAppSelector} from "@/store/hooks";
import {View, Text, StyleSheet} from "react-native";

export function RecordingTimer() {
  const {isRecording, recordingTime} = useAppSelector((s) => s.camera)

  if (!isRecording) return null

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(recordingTime)}
      </Text>
    </View>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 20,
  },
  text: {
    color: "red",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
})