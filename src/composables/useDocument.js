import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const useDocument = (collection, id, subCollection) => {
    const error = ref(null);
    const isPending = ref(false);

    let documentRef = projectFirestore.collection(collection).doc(id).collection(subCollection);

    const deleteDoc = async (docId) => {
        documentRef = documentRef.doc(docId);
        error.value = null;

        try {
            const res = await documentRef.delete();
            documentRef = projectFirestore.collection(collection).doc(id).collection(subCollection);
            return res;

        } catch (err) {
            error.value = err.message;
        }  
    };

    const addDoc = async (doc) => {
        documentRef = documentRef.doc(doc.name);
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
        documentRef = documentRef.doc(updates.name);
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