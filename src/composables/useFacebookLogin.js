import { ref } from "@vue/reactivity";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const facebookLogin = async (provider) => {
  error.value = null;
  try {
    const result = await projectAuth.signInWithPopup(provider);
    const credential = result.credential;
    const user = result.user;
    const accessToken = credential.accessToken;

    return { result, user, accessToken };
  } catch (err) {
    error.value = err.message;
  }
};

const useFacebookLogin = () => {
  return { error, facebookLogin };
};

export default useFacebookLogin;
