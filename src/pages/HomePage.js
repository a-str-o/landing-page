import React, { useState } from 'react';
import Quiz from './Fform';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import './Home.css'
import Hero from './Hero.png'
import emailjs from 'emailjs-com';
import validateForm from './validateForm';
import Logo from './Logo.png';

const HomePage = () => {
	const [email, setEmail] = useState('');
	const [page, setPage] = useState(true);

	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const resultError = validateForm({ email });

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		emailjs.send(
			'service_lqtj6a5',
			'template_dyr3fn8',
			{
				email: email,
			  },
			'fdIKcAw0wrB1qriMv'
		  )
			.then((response) => {
			  console.log('SUCCESS!', response.status, response.text);
			})
			.catch((err) => {
			  console.log('FAILED...', err);
			});
		setSuccess('Message was sent!');
		setPage(false);
	};

	return (
		<>
			{/* <Quiz /> */}
			<div className='page'>
				<h1 className='title'>Bientôt prêt !</h1>
				
			<Box sx={{ flexGrow: 2 }}>
				<Grid container spacing={2}>
					<Grid md={6} xs={12} order={{ xs: 2, md: 1 }}>
						{page? 
						<div className='bleu'>
							<img classname="logo" src={Logo} alt={Logo}/>
								<h1>Première plateforme de location de
									vêtements pour toutes vos occasions
								</h1>
								<h2>Le site de votre dressing illimité est
									bientôt prêt, encore un peu de patience.
								</h2>
								<h2>Inscrivez-vous pour ne pas rater nos offres de lancement</h2>
								<div className='email'>
									<form onSubmit={handleSubmit}>
										<input 
											placeholder='ADRESSE EMAIL'
											type="text"
											email='eamil'
											onChange={(e) => setEmail(e.target.value)}
										/>
										<button type="submit" > ENVOYER</button>
									</form>
									{success}
									{error}
								</div>
							</div>
						:
							<div className='bleu'>
								<img classname="logo" src={Logo} alt={Logo}/>
								<Quiz email={email} />
							</div>
						}
		
					</Grid>
					<Grid md={6} xs={12} order={{ xs: 1, md: 2 }}>
					<div className='red'>
						<img src={Hero} alt={Hero} />
					</div>
					</Grid>
				</Grid>
				</Box>
			

			</div>
		</>
	);
};

export default HomePage;
