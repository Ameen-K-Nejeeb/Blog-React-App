import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useAuth } from '../context/useAuth';
import { subscribeToBlog, updateBlogById } from '../firebase/blogService';

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToBlog(
      id,
      (nextBlog) => {
        setBlog(nextBlog);
        setLoading(false);
      },
      (subscriptionError) => {
        console.error(subscriptionError);
        setError("We couldn't load this blog for editing.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setDescription(blog.description || '');
      setImage(blog.image || '');
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to edit a blog.');
      return;
    }

    if (!description.trim()) {
      setError('Please keep some content in the editor.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await updateBlogById(
        id,
        {
          title,
          description,
          image: image || 'https://placehold.co/1200x800?text=Blog+Cover',
        },
        user.uid,
      );
      navigate(`/blog/${id}`);
    } catch (saveError) {
      setError(saveError.message || 'Unable to update this blog right now.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-500">Loading editor...</p>;

  if (!blog) return <p className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-500">Blog not found.</p>;

  if (blog.authorId !== user?.uid) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Editing is restricted</h2>
        <p className="mt-2 text-slate-500">Only the author who created this post can edit it.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">Edit your blog</h2>
        <p className="mt-2 text-slate-500">Changes are saved back to Firestore and stay tied to your account.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Blog Title'
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Content</label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Cover image URL</label>
            <input
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder='Image URL'
            />
          </div>

          <button type='submit' disabled={saving} className="w-full rounded-full bg-slate-950 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving changes...' : 'Update Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
