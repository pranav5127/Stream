import {CameraMode, CameraType, FlashMode} from "expo-camera"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Asset} from "expo-media-library";

export type CameraFacing = CameraType
export type CameraFlash = FlashMode
export type Mode = CameraMode
export type LatestAsset = Asset | null

export interface CameraState {
  facing: CameraFacing
  flash: CameraFlash
  mode: Mode
  torch: boolean
  flashDisabled: boolean
  latestAsset: LatestAsset
  isRecording: boolean
  recordingTime: number
}

const FLASH_MODES: CameraFlash[] = ["on", "off", "auto"]

const initialState: CameraState = {
  facing: "back",
  flash: "off",
  mode: "picture",
  torch: false,
  flashDisabled: false,
  latestAsset: null,
  isRecording: false,
  recordingTime: 0
}

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {

    cycleCameraFacing(state) {
      state.facing = state.facing === "back" ? "front" : "back"
      if (state.facing === "front") {
        state.flashDisabled = true
        state.flash = "off"
        state.torch = false
      } else {
        state.flashDisabled = false
      }
    },

    cycleCameraFlash(state) {
      const index = FLASH_MODES.indexOf(state.flash)
      state.flash = FLASH_MODES[(index + 1) % FLASH_MODES.length]
    },

    cycleCameraMode(state) {
      state.mode = state.mode === "picture" ? "video" : "picture"

      state.flash = "off"
      state.torch = false
    },

    enableTorch(state) {
      state.torch = !state.torch
    },

    setLatestAsset(state, action: PayloadAction<Asset | null>) {
      state.latestAsset = action.payload
    },

    startRecording(state) {
      state.isRecording = true
      state.recordingTime = 0
    },

    stopRecording(state) {
      // This prevents accidental double press
      if (!state.isRecording) return

      state.isRecording = false
      state.recordingTime = 0
    },

    tickRecordingTime(state) {
      if (state.isRecording) {
        state.recordingTime += 1
      }
    }
  }
})

export const {
  cycleCameraFacing,
  cycleCameraFlash,
  cycleCameraMode,
  enableTorch,
  setLatestAsset,
  startRecording,
  stopRecording,
  tickRecordingTime

} = cameraSlice.actions

export default cameraSlice.reducer
