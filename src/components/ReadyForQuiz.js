import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Quiz from './Quiz';

const ReadyForQuiz = () => {
  const [startDisabled, setStartDisabled] = useState(false);
  const [cancelDisabled, setCancelDisabled] = useState(true);
  const [key, setKey] = useState(false);
  const firestore = getFirestore();
  const userID = getAuth()?.currentUser?.uid;
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      try {
        const userRef = doc(firestore, 'users', userID);
        await setDoc(userRef, {
          userReadiness: false,
        });

        console.log('Выход');
      } catch (error) {
        console.error('Ошибка при обновлении пользовательских данных:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [firestore, userID]);

  // const checkUserReadiness = async () => {
  //   const usersRef = collection(firestore, 'users');
  //   const readinessQuery = where('userReadiness', '==', true);

  //   try {
  //     const snapshot = await getDocs(usersRef, readinessQuery);
  //     const allReady = snapshot.size > 0 && snapshot.size === snapshot.docs.length;

  //     if (allReady) {
  //       console.log('kefteme');
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при проверке готовности пользователей:', error);
  //   }
  // };

  const checkUserReadiness = async () => {
    const usersRef = collection(firestore, 'users');
    const snapshot = await getDocs(usersRef);
    const allReady = snapshot.docs.every((doc) => doc.data().userReadiness === true);
  
    if (allReady) {
      setShowQuiz(true); // Установите состояние showQuiz в true
    }
  
    setTimeout(checkUserReadiness, 1000);
  };

  const handleStart = async () => {
    sessionStorage.setItem('userReadiness', !key.toString());
  
    try {
      const userRef = doc(firestore, 'users', userID);
      await setDoc(userRef, {
        userReadiness: !key,
      });
      setKey(!key);
  
      console.log('Пользовательские данные успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении пользовательских данных:', error);
    }
  
    setStartDisabled(!startDisabled);
    setCancelDisabled(!cancelDisabled);
  
    // Проверка готовности пользователей после обновления значения userReadiness
    checkUserReadiness();
  };

  return (
    <div className='quiz_start'>
      {startDisabled ? null : <div className='start'>START if you are ready to start Quiz</div>}
      {!showQuiz && (
        <div>
        <Space className="site-button-ghost-wrapper">
          <Button ghost className={startDisabled ? 'start_able' : 'start_disable'} onClick={handleStart} disabled={startDisabled}>
            Start
          </Button>
          <Button ghost className={startDisabled ? 'cancel_able' : 'cancel_disable'} onClick={handleStart} disabled={cancelDisabled}>
            Cancel
          </Button>
        </Space>
      </div>
      )}
      {showQuiz && <Quiz />} {/* Отображение компонента Quiz, если showQuiz равно true */}
    </div>
  );
};

export default ReadyForQuiz;
