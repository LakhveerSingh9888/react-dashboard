import { LoginForm } from '@features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Sign In</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
