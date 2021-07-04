import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useCollection = (collection) => {
    const error = ref(null);
    const isPending = ref(false);
    let documentRef;

    const addUser = async (id, userInfo) => {
        documentRef = projectFirestore.collection(collection);
        error.value = null;

        try {
            const response = await projectFirestore.collection(collection).doc(id).set(userInfo);
            return response;

        } catch (err) {
            error.value = err.message;
        }
    };

    const addDoc = async (category) => {
        documentRef = projectFirestore.collection(collection);
        error.value = null;
        isPending.value = true;

        try {
            const response = await projectFirestore.collection(collection).doc(category.name).set(category);
            isPending.value = false;
            return response;

        } catch (err) {
            isPending.value = false;
            error.value = err.message;
        }
    };

    const deleteDoc = async (docId) => {
        documentRef = projectFirestore.collection(collection);
        error.value = null;
        documentRef = documentRef.doc(docId);

        try {
            const res = await documentRef.delete();
            return res;

        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, addUser, addDoc, deleteDoc, isPending };
};

export default useCollection;