import themeReducer from './themeSlice';
import authReducer from '@features/auth/slice';

const rootReducer = {
    theme: themeReducer,
    auth: authReducer,
};

export default rootReducer;
