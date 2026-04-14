import { Link } from 'react-router-dom'

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) {
    return 'Just now'
  }

  return timestamp.toDate().toLocaleDateString()
}

const BlogList = ({ blogs, currentUserId, deletingId, onDelete }) => {
  if (!blogs.length) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900">No blogs yet</h2>
        <p className="mt-2 text-slate-500">Create the first post and it will appear here for every signed-in session.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => {
        const isOwner = currentUserId && blog.authorId === currentUserId

        return (
          <article key={blog.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <img
              src={blog.image || 'https://placehold.co/1200x800?text=Blog+Cover'}
              alt={blog.title}
              className="h-52 w-full object-cover"
            />

            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
                  {blog.authorEmail || 'Unknown author'}
                </p>
                <Link to={`/blog/${blog.id}`} className="block text-2xl font-semibold text-slate-950 transition hover:text-sky-700">
                  {blog.title}
                </Link>
                <p className="text-sm text-slate-500">Published {formatDate(blog.createdAt)}</p>
              </div>

              <div
                className="line-clamp-4 text-sm leading-6 text-slate-600"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />

              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <Link to={`/blog/${blog.id}`} className="rounded-full bg-slate-100 px-4 py-2 text-slate-900 transition hover:bg-slate-200">
                  Read more
                </Link>

                {isOwner ? (
                  <>
                    <Link to={`/edit/${blog.id}`} className="rounded-full bg-amber-100 px-4 py-2 text-amber-800 transition hover:bg-amber-200">
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(blog.id)}
                      disabled={deletingId === blog.id}
                      className="rounded-full bg-rose-100 px-4 py-2 text-rose-700 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default BlogList
