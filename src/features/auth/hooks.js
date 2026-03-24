import { useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation, useProfileQuery } from './api';

export const useAuth = () => {
    return useSelector((state) => state.auth);
};

export const useLogin = () => useLoginMutation();
export const useRegister = () => useRegisterMutation();
export const useProfile = (options) => useProfileQuery(options);
