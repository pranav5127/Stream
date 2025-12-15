import {useAppSelector} from "@/store/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ShutterButton({pressed}: { pressed: boolean }) {
  const {mode, isRecording} = useAppSelector((s) => s.camera);

  // Video
  if (mode === "video") {
    return (
      <MaterialIcons
        name={isRecording ? "stop" : "circle"}
        size={isRecording ? 48 : 81}
        color={isRecording ? "red" : pressed ? "#ff8080" : "red"}
      />
    )
  }

  // Photo
  return (
    <MaterialIcons
      name="circle"
      size={81}
      color={pressed ? "#e6e6e6" : "white"}
    />
  )
}
