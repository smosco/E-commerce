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
  limit,
  startAfter,
} from 'firebase/firestore';

export const handleAddProduct = async (product) => {
  try {
    const docRef = doc(collection(firestore, 'products'));
    await setDoc(docRef, product);
  } catch (err) {
    console.error('Error adding product: ', err);
  }
};

export const handleFetchProducts = async ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  const pageSize = 6;

  try {
    let productsQuery = query(
      collection(firestore, 'products'),
      orderBy('createDate'),
      limit(pageSize)
    );

    if (filterType) {
      productsQuery = query(productsQuery, where('category', '==', filterType));
    }
    if (startAfterDoc) {
      if (startAfterDoc) {
        productsQuery = query(productsQuery, startAfter(startAfterDoc));
      }
    }

    const snapshot = await getDocs(productsQuery);
    const totalCount = snapshot.size;

    const data = [
      ...persistProducts,
      ...snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          documentID: doc.id,
        };
      }),
    ];

    return {
      data,
      queryDoc: snapshot.docs[totalCount - 1],
      isLastPage: totalCount < pageSize,
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
