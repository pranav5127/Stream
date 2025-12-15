import { useAppDispatch } from "@/store/hooks";
import {
  setAudioPermission,
  setCameraPermission,
  setMediaPermission,
} from "@/store/permissionSlice";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {useEffect} from "react";


/*
* PermissionManger is a component to manger Camera, Audio and Media permissions
* */
export default function PermissionsManager() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions()
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCameraPermission(cameraPermission?.granted ? "granted" : "unknown"))
    dispatch(setAudioPermission(audioPermission?.granted ? "granted" : "unknown"))
    dispatch(setMediaPermission(mediaPermission?.granted ? "granted" : "unknown"))

    askAllPermissions().then(r => console.log(`permissions granted ${r}`))
  }, )

  const askAllPermissions = async () => {
    try {
      if (!cameraPermission?.granted) {
        const res = await requestCameraPermission()
        dispatch(setCameraPermission(res.granted ? "granted" : "denied"))
      }
      if (!audioPermission?.granted) {
        const res = await requestAudioPermission()
        dispatch(setAudioPermission(res.granted ? "granted" : "denied"))
      }
      if (!mediaPermission?.granted) {
        const res = await requestMediaPermission()
        dispatch(setMediaPermission(res?.granted ? "granted" : "denied"))
      }

    } catch (err) {
      console.warn("Permission request error:", err)

    }
  }

  return null
}