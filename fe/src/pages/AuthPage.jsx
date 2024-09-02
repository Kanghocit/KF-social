import Signup from '../components/SignUp';
import Login from '../components/Login';
import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';


const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenState);

    return (
        <>
            {authScreenState === "login" ? <Login /> : <Signup />}
        </>
    );
}

export default AuthPage;
