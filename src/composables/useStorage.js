import { projectStorage, projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        const storageRef = projectStorage.ref(filePath.value);

        try {
            const res = await storageRef.put(file);
            url.value = await res.ref.getDownloadURL();

        } catch (err) {
            error.value = err.message;
        }
    };

    const deleteImage = async (imageUrl) => {
        const storageRef = projectStorage.refFromURL(imageUrl)

        try {
            await storageRef.delete();

        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, url, filePath, uploadImage, deleteImage };
};

export default useStorage;
