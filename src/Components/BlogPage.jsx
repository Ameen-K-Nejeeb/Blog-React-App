import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { deleteBlogById, subscribeToBlog } from '../firebase/blogService';

const BlogPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToBlog(
      id,
      (nextBlog) => {
        setBlog(nextBlog);
        setLoading(false);
      },
      (subscriptionError) => {
        console.error(subscriptionError);
        setError("We couldn't load this blog.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [id]);

  const handleDelete = async () => {
    if (!user) {
      setError('Please log in before deleting a blog.');
      return;
    }

    const confirmed = window.confirm('Delete this blog permanently?');
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError('');
      await deleteBlogById(id, user.uid);
      navigate('/');
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete the blog right now.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="mx-auto max-w-5xl px-4 py-16 text-center text-slate-500">Loading blog...</p>;
  }

  if (!blog) return <p className="mx-auto max-w-5xl px-4 py-16 text-center text-slate-500">Blog not found.</p>;

  const isOwner = user?.uid === blog.authorId;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <img src={blog.image} className="h-72 w-full object-cover md:h-96" alt={blog.title} />
        <div className="space-y-6 p-6 md:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">{blog.authorEmail}</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">{blog.title}</h1>
          </div>

          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          {isOwner ? (
            <div className="flex flex-wrap gap-3">
              <Link to={`/edit/${blog.id}`} className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-200">
                Edit blog
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete blog'}
              </button>
            </div>
          ) : null}

          <div
            className="blog-content prose max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
