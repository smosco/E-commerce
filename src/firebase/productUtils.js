import { firestore } from './utils';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

export const handleAddProduct = async (product) => {
  try {
    const docRef = doc(collection(firestore, 'products'));
    await setDoc(docRef, product);
  } catch (err) {
    console.error('Error adding product: ', err);
  }
};

export const handleFetchProducts = async (filterType) => {
  try {
    let productsQuery = query(
      collection(firestore, 'products'),
      orderBy('createDate')
    );

    if (filterType) {
      productsQuery = query(productsQuery, where('category', '==', filterType));
    }

    const snapshot = await getDocs(productsQuery);

    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      documentID: doc.id,
    }));

    return {
      data,
    };
  } catch (err) {
    console.error('Error fetching products: ', err);
  }
};

export const handleDeleteProduct = async (documentID) => {
  try {
    const docRef = doc(firestore, 'products', documentID);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting product: ', err);
  }
};

export const handleFetchProduct = async (productID) => {
  try {
    const docRef = doc(firestore, 'products', productID);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return {
        ...snapshot.data(),
        documentID: productID,
      };
    }
  } catch (err) {
    console.error('Error fetching product: ', err);
  }
};
