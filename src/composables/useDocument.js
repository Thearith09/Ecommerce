import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useDocument = (collection, id) => {
    const error = ref(null);
    const isPending = ref(false);

    const documentRef = projectFirestore.collection(collection).doc(id);

    const deleteDoc = async () => {
        error.value = null;

        try {
            const res = await documentRef.delete();
            return res;

        } catch (err) {
            error.value = err.message;
        }
    };

    const addDoc = async (doc) => {
        error.value = null; 
        isPending.value = true;

        try {
            const res = await documentRef.set(doc);
            isPending.value = false;
            return res;

        } catch (err) {
            error.value = err.message;
            isPending.value = false;
        }
    };

    const updateDoc = async (updates) => {
        error.value = null;
        isPending.value = true;

        try {
            const res = await documentRef.update(updates);
            isPending.value = false;
            return res;

        } catch (err) {
            isPending.value = false;
            error.value = err.message;
        }
    };

    return { error, deleteDoc, updateDoc, addDoc, isPending };
};

export default useDocument;