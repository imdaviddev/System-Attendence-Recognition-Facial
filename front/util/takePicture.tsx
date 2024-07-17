import { CameraPictureOptions } from "expo-camera"

export const takePicture = async (cameraRef: any) => {
    if(cameraRef.current){
        let options: CameraPictureOptions = {quality: 0.7, base64: false, exif: false, skipProcessing: true}
        let photo = await cameraRef.current.takePictureAsync(options)
        return photo
    }
  }
