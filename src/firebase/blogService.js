import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const blogsCollection = collection(db, "blogs");

const normalizeBlog = (snapshot) => ({
  id: snapshot.id,
  ...snapshot.data(),
});

export const subscribeToBlogs = (onData, onError) => {
  const blogsQuery = query(blogsCollection, orderBy("createdAt", "desc"));

  return onSnapshot(
    blogsQuery,
    (snapshot) => {
      onData(snapshot.docs.map(normalizeBlog));
    },
    onError,
  );
};

export const subscribeToBlog = (blogId, onData, onError) => {
  const blogRef = doc(db, "blogs", blogId);

  return onSnapshot(
    blogRef,
    (snapshot) => {
      onData(snapshot.exists() ? normalizeBlog(snapshot) : null);
    },
    onError,
  );
};

export const createBlog = async ({ title, description, image, user }) => {
  const blog = {
    title: title.trim(),
    description,
    image: image.trim(),
    authorId: user.uid,
    authorEmail: user.email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  return addDoc(blogsCollection, blog);
};
// security guard
const getOwnedBlogRef = async (blogId, userId) => {
  const blogRef = doc(db, "blogs", blogId);
  const snapshot = await getDoc(blogRef);

  if (!snapshot.exists()) {
    throw new Error("This blog no longer exists.");
  }

  if (snapshot.data().authorId !== userId) {
    throw new Error("You can only manage blogs created from your account.");
  }

  return blogRef;
};

export const updateBlogById = async (blogId, updates, userId) => {
  const blogRef = await getOwnedBlogRef(blogId, userId);

  await updateDoc(blogRef, {
    title: updates.title.trim(),
    description: updates.description,
    image: updates.image.trim(),
    updatedAt: serverTimestamp(),
  });
};

export const deleteBlogById = async (blogId, userId) => {
  const blogRef = await getOwnedBlogRef(blogId, userId);
  await deleteDoc(blogRef);
};
