import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import { useAuth } from "../context/useAuth";
import { deleteBlogById, subscribeToBlogs } from "../firebase/blogService";

const Home = () => {
  const { user, authLoading } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToBlogs(
      (nextBlogs) => {
        setBlogs(nextBlogs);
        setLoading(false);
      },
      (subscriptionError) => {
        console.error(subscriptionError);
        setError("We couldn't load blogs from Firebase.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const handleDelete = async (blogId) => {
    if (!user) {
      setError("Please log in before deleting a blog.");
      return;
    }

    const confirmed = window.confirm("Delete this blog permanently?");
    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(blogId);
      await deleteBlogById(blogId, user.uid);
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete the blog right now.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {/* <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Live from Firestore</p> */}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Publish blogs with persistent sessions</h1>
          <p className="mt-3 text-base text-slate-600">
            Every Posts comes from Talented Minds, Create your own posts.
          </p>
        </div>

        {user ? (
          <Link to="/add" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Create a new post
          </Link>
        ) : (
          <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Login to publish
          </Link>
        )}
      </div>

      {error ? <p className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {loading || authLoading ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
          Loading blogs...
        </div>
      ) : (
        <BlogList
          blogs={blogs}
          currentUserId={user?.uid}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
