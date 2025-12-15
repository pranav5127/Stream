import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useAppSelector} from "@/store/hooks";


export default function FlashIcon() {
  const {flash, mode, torch} = useAppSelector((s) => s.camera)

  if (mode === "video") {
    return torch
      ? <MaterialIcons name="flash-on" size={28} color="white"/>
      : <MaterialIcons name="flash-off" size={28} color="white"/>
  }

  if (flash === "on") {
    return <MaterialIcons name="flash-on" size={28} color="white"/>
  } else if (flash === "auto") {
    return <MaterialIcons name="flash-auto" size={28} color="white"/>
  } else {
    return <MaterialIcons name="flash-off" size={28} color="white"/>
  }
}