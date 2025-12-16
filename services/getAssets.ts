import * as MediaLibrary from "expo-media-library"
/*
* Get photos and videos from local storage.
* */

export async function getAssets() {
  const album = await MediaLibrary.getAlbumAsync("Stream")

  if (!album) {
    return []
  }

  const { assets } = await MediaLibrary.getAssetsAsync({
    album: album.id,
    first: 100,
    sortBy: [[MediaLibrary.SortBy.creationTime, false]],
    mediaType: [
      MediaLibrary.MediaType.photo,
      MediaLibrary.MediaType.video,
    ],
  })

  return assets.reverse()
}