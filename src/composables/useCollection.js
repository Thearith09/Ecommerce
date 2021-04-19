import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useCollection = (collection) => {
    const error = ref(null);

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

        try {
            const response = await projectFirestore.collection(collection).add(category);
            return response;

        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, addUser, addCategory };
};

export default useCollection;