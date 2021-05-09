import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection, limited, date) => {
  const error = ref(null);
  const documents = ref(null);
  let collectionRef;
  let nextPage;
  let limitedTemp = limited;
  let previousPage;

  if (date) {
    //for filtering
    collectionRef = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .where("createdAt", ">=", date.from)
      .where("createdAt", "<=", date.to);

  } else if (limited) {
    collectionRef = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .limit(limited);
    //paginage
    previousPage = async () => {
        let documentSnapshots = await projectFirestore
        .collection(collection)
        .orderBy("createdAt", "desc")
        .limit(limitedTemp).get();

        try {
            let results = [];
            let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1 - limited];
            let response = await projectFirestore
              .collection(collection)
              .orderBy("createdAt", "desc")
              .startAt(lastVisible)
              .limit(limited).get();

            limitedTemp -= limited;
    
            response.docs.forEach((doc) => results.push(doc.data()));
            console.log(results)
            return results;
    
          } catch (err) {
            return err;
          }
    };

    nextPage = async () => {
      let documentSnapshots = await projectFirestore
        .collection(collection)
        .orderBy("createdAt", "desc")
        .limit(limitedTemp).get();

      try {
        let results = [];
        let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        let response = await projectFirestore
          .collection(collection)
          .orderBy("createdAt", "desc")
          .startAfter(lastVisible)
          .limit(limited).get();

          limitedTemp += limited;

        response.docs.forEach((doc) => results.push(doc.data()));
        console.log(results)
        return results;

      } catch (err) {
        return err;
      }
    };
    
  } else {
    collectionRef = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc");
  }

  const unsubscribe = collectionRef.onSnapshot(
    (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      error.value = err.message;
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, documents, nextPage, previousPage };
};

export default getCollection;
