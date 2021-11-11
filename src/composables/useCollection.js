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
      const response = await projectFirestore
        .collection(collection)
        .doc(id)
        .set(userInfo);
      return response;
    } catch (err) {
      error.value = err.message;
    }
  };

  const addDoc = async (category) => {
    documentRef = projectFirestore.collection(collection);
    documentRef = documentRef.doc(category.name);
    error.value = null;
    isPending.value = true;

    try {
      const response = await documentRef.set(category);
      isPending.value = false;
      return response;
    } catch (err) {
      isPending.value = false;
      error.value = err.message;
    }
  };

  const updateDoc = async (category) => {
    documentRef = projectFirestore.collection(collection);
    documentRef = documentRef.doc(category.id);
    error.value = null;
    isPending.value = true;

    try {
      const res = await documentRef.update(category);
      isPending.value = false;
      return res;
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

  return { error, addUser, addDoc, updateDoc, deleteDoc, isPending };
};

export default useCollection;
