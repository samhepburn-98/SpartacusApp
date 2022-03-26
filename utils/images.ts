import { PhotoIdentifier } from "@react-native-community/cameraroll";
import ImageEditor from "@react-native-community/image-editor";
import RNFS from "react-native-fs";

export const getUri = async (img: PhotoIdentifier) => {
    return await ImageEditor.cropImage(img.node.image.uri, {
        size: {
            width: img.node.image.width,
            height: img.node.image.height
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
