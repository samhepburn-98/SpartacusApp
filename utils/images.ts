import { PhotoIdentifiersPage } from "@react-native-community/cameraroll";
import ImageEditor from "@react-native-community/image-editor";
import RNFS from "react-native-fs";

export const getUri = async (imgs: PhotoIdentifiersPage) => {
    //For now take the first
    const selectedPhoto = imgs?.edges[0];
    return await ImageEditor.cropImage(selectedPhoto.node.image.uri, {
        size: {
            width: selectedPhoto.node.image.width,
            height: selectedPhoto.node.image.height
        },
        offset: {
            x: 0,
            y: 0
        }
    });
};

export const getBase64StringFromUri = async (uri: string,) => {
    const base64Img = await RNFS.readFile(uri, "base64");
    return "data:image/png;base64," + base64Img;
};
