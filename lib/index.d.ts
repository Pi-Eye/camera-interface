/// <reference types="node" />
import { StreamOptions } from "pi-camera-connect";
import { SPTypes } from "node-stream-processor-types";
import TypedEmitter from "typed-emitter";
import { FileWriterConfig } from "file-writer";
import { NotificationConfig, MotionTrigger } from "notification-handler";
export declare type AllSettings = {
    camera: StreamOptions & SPTypes.RequiredSettings;
    text: SPTypes.TextSettings;
    motion: SPTypes.MotionSettings & MotionTrigger;
    device: SPTypes.DeviceSettings;
    files: Array<FileWriterConfig>;
    notifications: NotificationConfig;
};
export declare type CameraEvents = {
    ready: (settings: AllSettings) => void;
    frame: (frame: Buffer, timestamp: number, motion: boolean) => void;
    error: (error: Error) => void;
    disconnect: () => void;
};
export default interface CameraInterface {
    get events(): TypedEmitter<CameraEvents>;
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
