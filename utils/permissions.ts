import { check, Permission, PERMISSIONS, PermissionStatus, request, RESULTS } from "react-native-permissions";
import { Platform } from "react-native";
import { IToastService } from "native-base/lib/typescript/components/composites/Toast";

export const checkPhotoPermission = (): Promise<PermissionStatus> => {
    let permission: Permission;
    if (Platform.OS === "ios") permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    else permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    return check(permission);
};

const showToast = (toast: IToastService, title: string, status: string, description: string) => {
    const id = "permission-toast";
    if (!toast.isActive(id)) {
        toast.show({
            title: title,
            id: id,
            status: status,
            description: description,
            duration: 6000,
            variant: "solid"
        });
    }
};

export const showPhotoPermissionToast = (result: PermissionStatus, toast: IToastService) => {
    switch (result) {
    case RESULTS.UNAVAILABLE:
        showToast(
            toast,
            "Photo Permissions Unavailable",
            "error",
            "This feature is not available (on this device / in this context)"
        );
        break;
    case RESULTS.DENIED:
        showToast(
            toast,
            "Photo Permissions Denied",
            "error",
            "The permission has not been requested / is denied but requestable"
        );
        break;
    case RESULTS.BLOCKED:
        showToast(
            toast,
            "Photo Permissions Blocked",
            "error",
            "The permission is denied and not requestable anymore"
        );
        break;
    case RESULTS.LIMITED:
        showToast(
            toast,
            "Photo Permissions Limited",
            "warning",
            "The permission is limited: some actions are possible"
        );
        break;
    case RESULTS.GRANTED:
        break;
    default:
        break;
    }
};

export const requestPhotoPermission = (): Promise<PermissionStatus> => {
    let permission: Permission;
    if (Platform.OS === "ios") permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    else permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    return request(permission);
};
