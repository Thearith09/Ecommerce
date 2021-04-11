import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useCollection = (collection) => {
    const error = ref(null);

    const addDoc = async (id, userInfo) => {
        error.value = null;

        try {
            const response = await projectFirestore.collection(collection).doc(id).set(userInfo);
            return response;

        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, addDoc };
};

export default useCollection;