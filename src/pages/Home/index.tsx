import Game from '../../components/Game'
import JSLogo from '../../components/JSLogo'
import { useQuestionsStore } from '../../store/questions'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

const Home = () => {
	const [ questions, fetchQuestions, difficulty, setDifficulty ] = useQuestionsStore(state => [
		state.questions,
		state.fetchQuestions,
		state.difficulty,
		state.setDifficulty
	])
	const difficultyDictionary = ['Easy', 'Medium', 'Hard', 'Expert']

	const changeDifficulty = (index: number) => () => {
		setDifficulty(index)
	}
	
	return (
		<motion.div layout className={styles.home}>
			<motion.div layout className={styles.title}>
				<div className={styles.logo}>
					<JSLogo />
				</div>
				<span>
					Javascript Quiz
				</span>
			</motion.div>
			<AnimatePresence mode='wait'>
				{questions.length <= 0 ?
					<>
						<div className={styles.difficulty}>
							{difficultyDictionary.map((diff, index) => {
								return (
									<div className={styles.diff} key={diff} onClick={changeDifficulty(index)}>
										{diff}
										{difficulty == index &&
											<motion.div className={styles.selected}
											layoutId='selected'>
											</motion.div>
										}
									</div>
								)
							})}
						</div>
						<motion.button whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }} onClick={fetchQuestions}
						exit={{ opacity: 0 }}>
							Start
						</motion.button>
					</>
				:
					<Game />
				}
			</AnimatePresence>
		</motion.div>
	)
}

export default Home