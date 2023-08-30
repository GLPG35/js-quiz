import { motion } from 'framer-motion'
import { useQuestionsStore } from '../../store/questions'
import { Question as QuestionType } from '../../types'
import styles from './styles.module.scss'

const getBgColor = (info: QuestionType, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info
	
	if (userSelectedAnswer == null) return 'transparent'
	if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
	if (index == correctAnswer) return '#10b462'
	if (index == userSelectedAnswer) return '#be2445'

	return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
	const selectAnswer = useQuestionsStore(state => state.selectAnswer)
	
	const handleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex)
	}

	return (
		<div className={styles.question}>
			<div className={styles.title}>
				{info.question}
			</div>
			<div className={`${styles.answers} ${info.userSelectedAnswer !== undefined ? styles.disabled : ''}`}>
				{info.answers.map((answer, index) => {
					return (
						<motion.div key={index} className={styles.answer}
						onClick={handleClick(index)} style={{ backgroundColor: getBgColor(info, index) }}>
							{answer}
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}

export default Question