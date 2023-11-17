import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore, serverTimestamp, query, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "../service/firebaseconfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addPost = async (article: any) => {
  try {
    const commentData = collection(db, "articleposts");
    await addDoc(commentData, {
      ...article,
      createdAt: serverTimestamp(),
    });
    console.log("Se añadió un artículo");
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "articleposts"));
    const posted: any = [];

    querySnapshot.forEach((doc) => {
      const article = doc.data();
      posted.push({
        id: doc.id,
        ...article,
      });
    });

    posted.sort((a: any, b: any) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0));

    // Invierte el orden para que los más recientes estén primero
    return posted.reverse();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const tiempoRealProductos = async (contenedor: HTMLElement) => {
  const q = query(collection(db, "articleposts"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posted: any = [];

    querySnapshot.forEach((doc) => {
      const article = doc.data();
      posted.push({
        id: doc.id,
        ...article,
      });
    });

    // Limpiar el contenido actual del contenedor
    contenedor.innerHTML = "";

    // Agregar los nuevos elementos al contenedor
    posted.forEach((article: any) => {
      const card = document.createElement("article-card");
      card.setAttribute("img", article.imageUrl);
      card.setAttribute("name", article.name);
      card.setAttribute("quantity", article.quantity);
      card.setAttribute("price", article.price);

      contenedor.appendChild(card);
    });
  });


};

export default {
  getPost,
  addPost,
};
