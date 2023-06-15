import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const ReadyForQuiz = () => {
  const [startDisabled, setStartDisabled] = useState(false);
  const [cancelDisabled, setCancelDisabled] = useState(true);
  const [key, setKey] = useState(false)

  const handleStart = async () => {
    // Обновление поля userReadiness в объекте аутентификации пользователя
    const firestore = getFirestore();
    // const auth = getAuth();
    // const user = auth.currentUser;

    sessionStorage.setItem('userReadiness', !key)

    try {
      // Обновляем профиль пользователя в Firebase Authentication
      // await updateProfile(auth.currentUser, {
      //   displayName: displayName,
      // });
  
      // Добавляем дополнительные данные в Firestore
      const userRef = doc(firestore, 'users', 'bjNbinTFMmUEp28W8YycB3c9Wr02');
      await setDoc(userRef, {
        userReadiness: !key,
      });
      setKey(!key)
  
      console.log('Пользовательские данные успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении пользовательских данных:', error);
    }

    // updateProfile(user, {
    //   userReadiness: true,
    // })
    //   .then(() => {
    //     console.log('Поле userReadiness успешно обновлено');
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка при обновлении поля userReadiness:', error);
    //   });

    setStartDisabled(!startDisabled);
    setCancelDisabled(!cancelDisabled);
  };

  return (
    <div className='quiz_start'>
      {startDisabled ? null : <div className='start'>START if you are ready to start Quiz</div>}
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
    </div>
  );
};

export default ReadyForQuiz;
