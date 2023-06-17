import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function Quiz() {
	
	const [userData, setUserData] = useState(null);
	const [userResults, setUserResults] = useState([]);
	const [showUserResults, setShowUserResults] = useState(false);
	const [allfalse, setAllfalse] = useState(false)
	const firestore = getFirestore();
	const userID = getAuth()?.currentUser?.uid;
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

	

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
			
			const checkUserReadiness = async () => {
			  const firestore = getFirestore();
			  const querySnapshot = await getDocs(collection(firestore, 'users'));
			  const allReady = querySnapshot.docs.every((doc) => doc.data().userReadiness === false);
			  if (allReady) {
				setAllfalse(true)
			  }else{checkUserReadiness()}
			};
		  
			checkUserReadiness();
		  }
	};

	useEffect(() => {
        if (showScore) {
			try {
				const userRef = doc(firestore, 'users', userID);
				setDoc(userRef, {
					userReadiness: false,
					result: score,
					name: auth.currentUser.displayName
				});
			
				console.log('Пользовательские данные успешно обновлены');
				} catch (error) {
				console.error('Ошибка при обновлении пользовательских данных:', error);
			}
        }
    }, [showScore]);

	useEffect(() => {
		const getUsersResults = async () => {
			try {
				const querySnapshot = await getDocs(collection(firestore, 'users'));
				const results = querySnapshot.docs.map((doc) => doc.data());
				setUserResults(results);
				const allReady = results.every((result) => result.userReadiness === true);
				setShowUserResults(allReady);
			} catch (error) {
				console.error('Ошибка при получении результатов пользователей:', error);
			}
		};

		getUsersResults();
	}, [showScore]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUserData();
				setUserData(data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};
	
		if (allfalse) {
			fetchData();
		}
	}, [allfalse]);

	const getUserData = async () => {
		try {
			const querySnapshot = await getDocs(collection(firestore, 'users'));
			const results = querySnapshot.docs.map((doc) => doc.data());
			const allReady = results.every((result) => result.userReadiness === false);
			if(allReady === true) {return(results)
			}
		} catch (error) {
			console.error('Ошибка при получении результатов пользователей:', error);
		}
	}

	return (
		<div className='quiz_app'>
			{showScore ? (
				allfalse ? (
					userData ? (
						<div className='user-results'>
							<h2>User Results:</h2>
							<ul>
								{userData.map((result, index) => (
									<li key={index}>
										<p>{result.name}</p>
										<p>Result: {result.result}</p>
									</li>
								))}
							</ul>
						</div>
					) : (
						<div>Loading results...</div>
					)
					
				) : (<div>Waiting for other users...</div>) 
			)
			 : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div>
							 You answered {score} out of {currentQuestion} questions correctly
						</div>
						<br/>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}

		</div>
	);
}