import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";


const useUserDoc = (collection, id) => {
    const error = ref(null);
    const documentRef = projectFirestore.collection(collection).doc(id);

    const updateProfile = async (updates) => {
        error.value = null;
        
        try {
            await documentRef.update(updates);

        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, updateProfile };
};

export default useUserDoc;