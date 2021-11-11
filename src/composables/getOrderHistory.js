import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection, email) => {
  const error = ref(null);
  const isPending = ref(null);
  const documents = ref(null);
  let documentsRef = projectFirestore.collection(collection);

  const unsubscribe = documentsRef.onSnapshot(
    (snapshot) => {
      const result = [];
      isPending.value = true;
      snapshot.docs.forEach((doc) => {
        if (doc.data().email == email) {
          result.push({ id: doc.id, ...doc.data() });
        }
      });
      error.value = null;
      isPending.value = false;
      documents.value = result;
    },
    (err) => {
      error.value = err.message;
      documents.value = null;
      isPending.value = false;
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, isPending, documents };
};

export default getCollection;
