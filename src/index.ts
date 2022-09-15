import { StreamOptions } from "pi-camera-connect";
import { SPTypes } from "node-stream-processor";
import TypedEmitter from "typed-emitter";

export type AllSettings = {
  camera: StreamOptions & SPTypes.RequiredSettings;
  text: SPTypes.TextSettings;
  motion: SPTypes.MotionSettings;
  device: SPTypes.DeviceSettings;
}

export type CameraEvents = {
  // Once camera is ready, fire this event and send camera's configuration
  ready: (settings: AllSettings) => void;
  // When a frame is captured
  frame: (frame: Buffer, timestamp: number, motion: boolean) => void;
  // For errors
  error: (error: Error) => void;
  // For disconnections
  disconnect: () => void;
};

export default interface CameraInterface {
  get events(): TypedEmitter<CameraEvents>; // Where to listen for events

  /**
   * @param config_file_loc location of configuration file, should include all settings if standalone, have address and password if server-camera
   */
  new(config_file_loc: string): void;

  /**
   * SetCameraSettings() - Sets camera's capture settings
   * @param camera_settings camera's capture settings
   */
  SetCameraSettings(camera_settings: StreamOptions & SPTypes.RequiredSettings): void;

  /**
   * SetTextSettings() - Sets text overlay settings
   * @param text_settings text overlay settigns (can be empty object to signify no text overlay)
   */
  SetTextSettings(text_settings: SPTypes.TextSettings): void;

  /**
   * SetMotionSettings() - Sets motion detection settings
   * @param motion_settings motion detection configuration (can be empty object to signify no motion detection)
   * @param device_settings device settings for running motion detection (should be an empty object is motion detection is also empty)
   */
  SetMotionSettings(motion_settings: SPTypes.MotionSettings, device_settings: SPTypes.DeviceSettings): void;

  /**
   * GetCombinedSettings() - returns all camera related settings bundled together
   */
  GetCombinedSettings(): AllSettings;
}