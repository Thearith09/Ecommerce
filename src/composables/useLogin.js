import { projectAuth } from "@/firebase/config";
import { ref } from "@vue/reactivity";

const error = ref(null);

const login = async (email, password) => {
    error.value = null;

    try {
        await projectAuth.signInWithEmailAndPassword(email, password);

    } catch (err) {
        error.value = err.message;
    }
};

const useLogin = () => {
    return { error, login };
};

export default useLogin;