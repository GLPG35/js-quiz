import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
	questions: Question[],
	currentQuestion: number,
	difficulty: number,
	questionsLimit: number,
	setDifficulty: (index: number) => void,
	fetchQuestions: () => Promise<void>,
	selectAnswer: (questionId: number, answerIndex: number) => void,
	nextQuestion: () => void,
	prevQuestion: () => void,
	reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
	return {
		questions: [],
		currentQuestion: 0,
		difficulty: 1,
		questionsLimit: 10,
		setDifficulty: (index: number) => {
			const limitDictionary = [5, 10, 25, 50]
			
			set({ difficulty: index, questionsLimit: limitDictionary[index] })
		},
		fetchQuestions: async () => {
			fetch('http://localhost:5173/questions.json')
			.then(res => res.json())
			.then(json => {
				const { questionsLimit } = get()

				const questions = json.sort(() => Math.random() - 0.5).slice(0, questionsLimit)

				set({ questions })
			})
		},
		selectAnswer: (questionId: number, answerIndex: number) => {
			const { questions } = get()
			
			const newQuestions = structuredClone(questions)
			const questionIndex = newQuestions.findIndex(x => x.id == questionId)
			const questionInfo = newQuestions[questionIndex]

			const isCorrectAnswer = questionInfo.correctAnswer == answerIndex

			if (isCorrectAnswer) confetti()

			newQuestions[questionIndex] = {
				...questionInfo,
				userSelectedAnswer: answerIndex,
				isCorrectAnswer
			}

			set({ questions: newQuestions })
		},
		nextQuestion: () => {
			const { currentQuestion, questions } = get()
			const nextQuestion = currentQuestion + 1

			if (nextQuestion < questions.length) {
				set({ currentQuestion: nextQuestion })
			}
		},
		prevQuestion: () => {
			const { currentQuestion } = get()
			const prevQuestion = currentQuestion - 1

			if (prevQuestion >= 0) {
				set({ currentQuestion: prevQuestion })
			}
		},
		reset: () => {
			set({ currentQuestion: 0, questions: [] })
		}
	}
}, { name: 'questions' }))