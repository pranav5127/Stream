import { View, Image, StyleSheet, Pressable } from "react-native"
import { useAppSelector } from "@/store/hooks"
import { useRouter } from "expo-router"

export default function GalleryPreview() {
  const assets = useAppSelector(s => s.camera.latestAssets)
  const router = useRouter()

  if (!assets || assets.length === 0) {
    return <View style={styles.placeholder} />
  }

  const latest = assets[0]

  function openGallery() {
    router.push("/gallery")
  }

  return (
    <Pressable onPress={openGallery}>
      <Image
        source={{ uri: latest.uri }}
        style={styles.preview}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  preview: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "white",
  },
  placeholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#333",
  },
})
