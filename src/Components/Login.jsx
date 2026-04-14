import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Login = () => {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError('');
      await signIn(email, password);
      navigate(redirectPath, { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-center text-3xl font-bold text-slate-950">Login</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Continue with your existing account.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-1 block w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="mt-1 block w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm outline-none transition focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-sky-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
