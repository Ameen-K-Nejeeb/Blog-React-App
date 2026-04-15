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


# Blog App Technical Documentation

## Stack Overview
This app is a React single-page blog app built with **Vite**, styled with **Tailwind CSS**, and backed by **Firebase Authentication + Firestore**.

### Libraries Actively Used
* **react & react-dom**: Renders the UI and manages component state.
* **react-router-dom**: Handles page routing (e.g., `/`, `/login`, `/blog/:id`, `/add`).
* **firebase**: Provides Authentication and Firestore database access.
* **tailwindcss**: Utility-first CSS framework for styling.
* **react-quill-new**: Rich text editor used for creating and editing blog content.

### Present but Inactive
* **Redux Toolkit (@reduxjs/toolkit)**: Store and slices exist but are not currently mounted in `main.jsx`.
* **Firebase Storage**: Initialized but not currently used for file uploads.
* **UUID**: Installed but not imported.

---

## How It Works

### 1. Startup Flow
1.  **Vite** loads `index.html`, which mounts React into the `#root` div.
2.  `src/main.jsx` renders the `App` component wrapped inside the `AuthProvider`.
3.  `src/App.jsx` initializes the router and defines all page paths.

### 2. Auth Flow
* **`src/context/AuthContext.jsx`**: The core logic. It sets persistence to `browserLocalPersistence` so sessions survive browser refreshes. It listens to login states via `onAuthStateChanged`.
* **`src/context/useAuth.js`**: A custom hook allowing components to easily access user data and auth functions (`signIn`, `signUp`, etc.).

### 3. Data Flow
* **`src/firebase/blogService.js`**: The data layer.
    * `subscribeToBlogs()`: Real-time listener for the entire collection (ordered by date).
    * `createBlog()`: Inserts new posts with HTML content from Quill and author metadata.
    * `updateBlogById()` / `deleteBlogById()`: Verifies ownership before performing database mutations.

### 4. Security Flow
* **Firestore Rules (`firestore.rules`)**: Enforces real security.
    * **Read**: Public.
    * **Create**: Logged-in users only.
    * **Update/Delete**: Only the document owner (`request.auth.uid == resource.data.authorId`).

---

## Component Breakdown

| Component | Responsibility |
| :--- | :--- |
| **Navbar** | Navigation links; toggles between Guest and User views. |
| **Home** | Subscribes to the live feed of all blogs. |
| **BlogList** | Presentational cards; shows Edit/Delete buttons only for owners. |
| **BlogPage** | Detailed view of a single post using real-time subscription. |
| **BlogForm / EditBlog** | Handles the Quill editor and Firestore writes. |
| **ProtectedRoute** | Redirects unauthenticated users away from private routes like `/add`. |

---

## Important Configuration Files
* **`src/index.css`**: Tailwind imports and global UI styling (gradients, Quill overrides).
* **`firebase.json`**: Configures hosting and "rewrites" so React Router works correctly on refreshed URLs.
* **`firestore.rules`**: The "Security Guard" for your database.

---

## End-to-End Behavior
1.  **User Opens App**: Firebase restores the session.
2.  **Browsing**: Home page shows live posts via `onSnapshot`.
3.  **Creation**: Logged-in users write posts; metadata (UID) is attached.
4.  **Real-Time**: If a user updates a post, everyone else sees the change instantly without refreshing.
5.  **Ownership**: Unauthorized users are blocked from editing via both UI checks and Firestore Rules.