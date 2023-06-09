import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { saveUsers } from './Redux/actions';

export const GetFirestoreData = async (dispatch) => {

  try {
    const dataCollection = collection(db, 'data');

    const snapshot = await getDocs(dataCollection);

    const data = snapshot.docs.map((doc) => doc.data());

    dispatch(saveUsers(data[0]))

    return data[0];
  } catch (error) {
    throw new Error('Ошибка при получении данных из Firebase Firestore');
  }
};