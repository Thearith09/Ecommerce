import { projectFirestore } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection, limited, date) => {
  const error = ref(null);
  const documents = ref(null);
  const isPending = ref(false);
  let collectionRef;
  let nextPage;
  let previousPage;
  let limitedTemp = limited;

  if (date) {
    //for filtering
    collectionRef = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .where("createdAt", ">=", date.from)
      .where("createdAt", "<=", date.to);
  } else if (limited) {
    console.log("LimitedTemp: ", limitedTemp);
    isPending.value = true;
    collectionRef = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .limit(limited);
    //paginage
    previousPage = async () => {
      limitedTemp -= limited;
      let documentSnapshots = await projectFirestore
        .collection(collection)
        .orderBy("createdAt", "desc")
        .limit(limitedTemp)
        .get();

      try {
        let results = [];
        let lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - limited];
        let response = await projectFirestore
          .collection(collection)
          .orderBy("createdAt", "desc")
          .startAt(lastVisible)
          .limit(limited)
          .get();

        console.log("LimitedTemp: ", limitedTemp);

        response.docs.forEach((doc) =>
          results.push({ ...doc.data(), id: doc.id })
        );
        console.log(results);
        return results;
      } catch (err) {
        return err;
      }
    };

    nextPage = async () => {
      let documentSnapshots = await projectFirestore
        .collection(collection)
        .orderBy("createdAt", "desc")
        .limit(limitedTemp)
        .get();

      try {
        let results = [];
        let lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        let response = await projectFirestore
          .collection(collection)
          .orderBy("createdAt", "desc")
          .startAfter(lastVisible)
          .limit(limited)
          .get();

        limitedTemp += limited;
        console.log("LimitedTemp: ", limitedTemp);

        response.docs.forEach((doc) =>
          results.push({ ...doc.data(), id: doc.id })
        );
        console.log(results);
        isPending.value = false;
        return results;
      } catch (err) {
        isPending.value = false;
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
      isPending.value = true;
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
      isPending.value = false;
    },
    (err) => {
      error.value = err.message;
      isPending.value = false;
      documents.value = null;
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, documents, nextPage, previousPage, isPending };
};

export default getCollection;
