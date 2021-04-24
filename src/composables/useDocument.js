import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useDocument = (collection, id) => {
    const error = ref(null);

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

        try {
            const res = await documentRef.set(doc);
            return res;

        } catch (err) {
            error.value = err.message;
        }
    };

    const updateDoc = async (updates) => {
        error.value = null;

        try {
            const res = await documentRef.update(updates);
            return res;

        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, deleteDoc, updateDoc, addDoc };
};

export default useDocument;