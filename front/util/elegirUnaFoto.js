import * as ImagePicker from 'expo-image-picker'

export default async function elegirUnaFoto(){
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      return result
    } else {
      alert('No se seleccionó ninguna imagen.');
    }
  };