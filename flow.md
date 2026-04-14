# contributions, library Used, and all

### Library
- react-router-dom
- firebase
- npm install @reduxjs/toolkit react-redux
- react-quill-new
- npm install uuid

1, created the store.js , 
2, features/blogSlice.js => updated
3, app.jsx
4, Navbar -> Home -> BlogPage -> Login -> Register -> BlogForm
5, applying tailwind css


Stack
This app is a React single-page blog app built with Vite, styled with Tailwind CSS, and backed by Firebase Authentication + Firestore.

Libraries actually used:

react and react-dom: render the UI and manage component state.
react-router-dom: page routing like /, /login, /blog/:id, /add, /edit/:id in src/App.jsx (line 1).
firebase: auth and Firestore access in src/firebase/firebase.js (line 1) and src/firebase/blogService.js (line 1).
tailwindcss and @tailwindcss/vite: utility-first styling, enabled in vite.config.js (line 1) and imported in src/index.css (line 1).
react-quill-new: rich text editor used in create/edit forms in src/Components/BlogForm.jsx (line 1) and src/Components/EditBlog.jsx (line 1).
Present but not actively used in the running app:

@reduxjs/toolkit, react-redux: there is a store and slice, but no Redux Provider is mounted in src/main.jsx (line 1), so Redux is currently inactive.
uuid: installed but not imported anywhere.
Firebase Storage: storage is exported in src/firebase/firebase.js (line 1) but not used yet.
src/App.css (line 1) looks like leftover Vite starter CSS and is not imported.
public/index.html (line 1) is not the page Vite uses; the active HTML entry is root index.html (line 1).
How It Works
Startup flow:

Vite loads index.html (line 1), which mounts React into #root.
src/main.jsx (line 1) renders App inside AuthProvider.
src/App.jsx (line 1) creates the router and page routes.
Auth flow:

src/context/AuthContext.jsx (line 1) is the auth backbone.
It sets Firebase auth persistence to browserLocalPersistence, so refreshes keep the session.
It listens with onAuthStateChanged, stores the current user, and exposes signUp, signIn, signOutUser.
src/context/useAuth.js (line 1) is just a helper hook so components can access auth safely.
Data flow:

src/firebase/firebase.js (line 1) initializes Firebase and exports auth, db, and storage.
src/firebase/blogService.js (line 1) is the blog data layer.
subscribeToBlogs() listens to the whole blogs collection in real time, ordered by createdAt desc.
subscribeToBlog(id) listens to one blog document in real time.
createBlog() inserts title, HTML description, image, author id/email, and timestamps.
updateBlogById() and deleteBlogById() first verify ownership, then update/delete.
Security flow:

Firestore rules in firestore.rules (line 1) allow:
anyone to read blogs,
only logged-in users to create blogs,
only the original author to update/delete.
This matches the frontend checks, which is good because the real security is enforced in Firestore rules, not just the UI.
Component-By-Component

src/Components/Navbar.jsx (line 1): top navigation; shows login/signup for guests, and email + write/logout for logged-in users.
src/Components/Home.jsx (line 1): homepage; subscribes to all blogs, shows hero area, handles delete from the list.
src/Components/BlogList.jsx (line 1): presentational list of blog cards; shows edit/delete only for the owner.
src/Components/BlogPage.jsx (line 1): single blog detail page; subscribes to one document and lets the owner edit/delete.
src/Components/BlogForm.jsx (line 1): create-post form; uses Quill editor and writes directly to Firestore.
src/Components/EditBlog.jsx (line 1): edit form; loads one blog, checks ownership, updates Firestore.
src/Components/Login.jsx (line 1): login form; signs in and redirects back to the page the user originally wanted.
src/Components/Signup.jsx (line 1): signup form; creates a Firebase account.
src/Components/ProtectedRoute.jsx (line 1): route guard; blocks /add and /edit/:id until auth is known and user is logged in.
Important Files

src/index.css (line 1): global styles, Tailwind import, background gradient, Quill editor styling.
vite.config.js (line 1): enables React and Tailwind plugins.
firebase.json (line 1): Firebase hosting + Firestore config; rewrites all routes to index.html so React Router works on refresh.
firestore.indexes.json (line 1): currently empty; no custom indexes needed right now.
src/store.js (line 1) and src/features/blogSlice.js (line 1): old Redux setup, currently unused.
End-to-End App Behavior

User opens app.
Firebase auth restores session if already logged in.
Home page subscribes live to Firestore blogs.
Guest can read blogs, but cannot add/edit/delete.
Logged-in user can create a post.
Created post stores author identity.
Only that same author can later edit/delete it.
Changes appear in real time because Firestore onSnapshot is being used.