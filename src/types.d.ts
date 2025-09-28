export interface Question {
	id: number,
	question: { 'es': string, 'en': string },
	answers: { 'es': string[], 'en': string[] },
	correctAnswer: number,
	userSelectedAnswer?: number,
	isCorrectAnswer?: boolean
}