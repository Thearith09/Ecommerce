import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";


const useUserDoc = (collection, id) => {
    const error = ref(null);
    const isPending = ref(false);
    const documentRef = projectFirestore.collection(collection).doc(id);

    const updateProfile = async (updates) => {
        error.value = null;
        isPending.value = true;
        
        try {
            await documentRef.update(updates);
            isPending.value = false;

        } catch (err) {
            isPending.value = false;
            error.value = err.message;
        }
    };

    return { error, updateProfile, isPending };
};

export default useUserDoc;