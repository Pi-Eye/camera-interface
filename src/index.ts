import { StreamOptions } from "pi-camera-connect";
import { SPTypes } from "node-stream-processor-types";
import TypedEmitter from "typed-emitter";
import { FileWriterConfig } from "file-writer";
import { NotificationConfig, MotionTrigger } from "notification-handler";

export type AllSettings = {
  camera: StreamOptions & SPTypes.RequiredSettings;
  text: SPTypes.TextSettings;
  motion: SPTypes.MotionSettings & MotionTrigger;
  device: SPTypes.DeviceSettings;
  files: Array<FileWriterConfig>;
  notifications: NotificationConfig;
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
   * SetCombinedSettings() - Sets all camera related settings
   * @param settings all settings
   */
  SetCombinedSettings(settings: AllSettings): void;

  /**
   * GetCombinedSettings() - returns all camera related settings bundled together
   */
  GetCombinedSettings(): AllSettings;
}