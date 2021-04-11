import { projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const user = ref(null);

projectAuth.onAuthStateChanged((_user) => {
    user.value = _user;
});

const getUser = () => {
    return { user };
};

export default getUser;