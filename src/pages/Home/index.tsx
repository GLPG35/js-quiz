import { useState } from 'react'
import Game from '../../components/Game'
import JSLogo from '../../components/JSLogo'
import { useQuestionsStore } from '../../store/questions'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { TbWorld } from 'react-icons/tb'

const Home = () => {
	const questions = useQuestionsStore(state => state.questions)
	const difficulty = useQuestionsStore(state => state.difficulty)
	const language = useQuestionsStore(state => state.language)
	const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)
	const setDifficulty = useQuestionsStore(state => state.setDifficulty)
	const setLanguage = useQuestionsStore(state => state.setLanguage)
	const [selector, setSelector] = useState(false)
	const difficultyDictionary = { 'es': ['Fácil', 'Medio', 'Difícil', 'Experto'], 'en': ['Easy', 'Medium', 'Hard', 'Expert'] }

	const changeDifficulty = (index: number) => () => {
		setDifficulty(index)
	}

	const changeLanguage = (language: 'en'|'es') => () => {
		setLanguage(language)
		setSelector(false)
	}
	
	return (
		<motion.div layout className={styles.home}>
			<div className={styles.languageSelector}>
				<button className={styles.wrapper} onClick={() => setSelector(!selector)}>
					<div className={styles.icon}>
						<TbWorld />
					</div>
					<span>{language}</span>
				</button>
				<AnimatePresence>
					{selector &&
						<motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className={styles.select}>
							<div className={styles.language} onClick={changeLanguage('en')}>
								EN - English
							</div>
							<div className={styles.language} onClick={changeLanguage('es')}>
								ES - Español
							</div>
						</motion.div>
					}
				</AnimatePresence>
			</div>
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
							{difficultyDictionary[language].map((diff, index) => {
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
							{language == 'es' ? 'Empezar' : 'Start'}
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