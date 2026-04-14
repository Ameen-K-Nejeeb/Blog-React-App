import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const Signup = () => {
    const { user, signUp } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            setError('');
            await signUp(email, password);
            navigate('/');
        } catch (signupError) {
            setError(signupError.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
            <div className='w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200'>
                <h2 className="text-center text-3xl font-bold text-slate-950">Create account</h2>
                <p className="mt-2 text-center text-sm text-slate-500">Your session will stay available after refresh using Firebase auth persistence.</p>

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-1 block w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm outline-none transition focus:border-sky-500'
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 block w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm outline-none transition focus:border-sky-500'
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={submitting}
                        className='w-full rounded-full bg-slate-950 px-4 py-3 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
                    >
                        {submitting ? 'Creating account...' : 'Signup'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already registered?{' '}
                    <Link to="/login" className="font-medium text-sky-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
