import { useQuestionsStore } from '../../store/questions'
import Question from '../Question'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'

const Game = () => {
	const questions = useQuestionsStore(state => state.questions)
	const currentQuestion = useQuestionsStore(state => state.currentQuestion)
	const language = useQuestionsStore(state => state.language)
	const nextQuestion = useQuestionsStore(state => state.nextQuestion)
	const prevQuestion = useQuestionsStore(state => state.prevQuestion)
	const reset = useQuestionsStore(state => state.reset)
	const questionInfo = questions[currentQuestion]

	const handleNextQuestion = () => {
		nextQuestion()
	}

	const handlePrevQuestion = () => {
		prevQuestion()
	}

	const handleReset = () => {
		reset()
	}
	
	return (
		<motion.div className={styles.game}
		initial={{ scaleY: 0 }} animate={{ scaleY: 1, transition: { type: 'spring', duration: 1 } }}>
			<div className={styles.arrows}>
				<button className={styles.arrow}
				disabled={currentQuestion === 0}
				onClick={handlePrevQuestion}>
					<TbChevronLeft />
				</button>
				<div className={styles.position}>
					{currentQuestion + 1} / {questions.length}
				</div>
				<button className={styles.arrow}
				disabled={currentQuestion >= questions.length - 1}
				onClick={handleNextQuestion}>
					<TbChevronRight />
				</button>
			</div>
			<Question info={questionInfo} />
			<AnimatePresence>
				{questionInfo.userSelectedAnswer !== undefined && currentQuestion < questions.length -1 &&
					<motion.button className={styles.next} onClick={handleNextQuestion}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
						{language == 'es' ? 'Siguiente' : 'Next'}
					</motion.button>
				}
			</AnimatePresence>
			<div className={styles.reset}
			onClick={handleReset}>
				{language == 'es' ? 'Reiniciar' : 'Reset'}
			</div>
		</motion.div>
	)
}

export default Game