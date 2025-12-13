import { useAppSelector } from "@/store/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const ShutterButton = ({ pressed }: { pressed: boolean }) => {
  const { mode } = useAppSelector((s) => s.camera);

  // Video
  if (mode === "video") {
    return (
      <MaterialIcons
        name="circle"
        size={81}
        color={pressed ? "#ff8080" : "red"}
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
