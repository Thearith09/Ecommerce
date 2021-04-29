import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useCollection = (collection) => {
    const error = ref(null);
    const isPending = ref(false);

    const addUser = async (id, userInfo) => {
        error.value = null;

        try {
            const response = await projectFirestore.collection(collection).doc(id).set(userInfo);
            return response;

        } catch (err) {
            error.value = err.message;
        }
    };

    const addCategory = async (category) => {
        error.value = null;
        isPending.value = true;

        try {
            const response = await projectFirestore.collection(collection).add(category);
            isPending.value = false;
            return response;

        } catch (err) {
            isPending.value = false;
            error.value = err.message;
        }
    };

    return { error, addUser, addCategory, isPending };
};

export default useCollection;