import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useAuth } from '../context/useAuth';
import { createBlog } from '../firebase/blogService';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to publish a blog.');
      return;
    }

    if (!description.trim()) {
      setError('Please add some blog content before publishing.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const fallbackImage = image || 'https://placehold.co/1200x800?text=Blog+Cover';
      const docRef = await createBlog({
        title,
        description,
        image: fallbackImage,
        user,
      });
      navigate(`/blog/${docRef.id}`);
    } catch (submitError) {
      setError(submitError.message || 'Unable to publish this blog right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-4xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">Create a new post</h2>
        <p className="mt-2 text-slate-500">Every Posts comes from Talented Minds, Create your own posts.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500" placeholder="Write a strong title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Cover image URL</label>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500" placeholder="https://example.com/cover.jpg" value={image} onChange={e => setImage(e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Content</label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </div>

          <button disabled={submitting} className="w-full rounded-full bg-slate-950 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? 'Publishing...' : 'Publish Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
