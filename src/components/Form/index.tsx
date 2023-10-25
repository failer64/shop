import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ItemType } from "../../types/types";
import "./style.scss"
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import InputMask, { Props } from 'react-input-mask';
import { dataAPI } from "../../api/api";


type FromType = {
	activeItem: ItemType | null
}

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/

const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.required('Имя должно быть заполнено'),
	phone: Yup.string()
		.matches(phoneRegExp, 'Вы ввели некорректный телефон')
		.required('Телефон должен быть заполнен'),
	email: Yup.string()
		.email('Вы ввели некорректную почту')
		.required('Почта должна быть заполнена'),
});

const FormPage: FC<FromType> = ({ activeItem }) => {

	const navigate = useNavigate();

	return (
		<div className='body'>
			<div className='title'>{activeItem?.NAME}</div>
			<Formik
				initialValues={{
					name: '',
					phone: '',
					email: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);

					dataAPI.sendInfo()
						.then(res => {
							if (res.result === 0) {
								navigate('/send', { replace: true });
							}
							setSubmitting(false);
						})

				}}
			>
				{({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
					<Form>
						<div className={`item 
						${errors.name && touched.name ? 'error' : ''}`}
						>
							<label htmlFor="name">Имя *</label>
							<Field name="name" placeholder='Введите...' />
							{errors.name && touched.name ? (
								<div className="message">{errors.name}</div>
							) : null}
						</div>

						<div className={`item 
						${errors.phone && touched.phone ? 'error' : ''}`}
						>
							<label htmlFor="phone">Телефон *</label>
							<InputMask
								mask="+79999999999"
								onChange={handleChange} onBlur={handleBlur}
								value={values.phone}
							>
								{
									//@ts-ignore
									(inputProps: Props) =>
										<Field
											{...inputProps}
											name="phone" placeholder='+7__________' />
								}
							</InputMask>

							{errors.phone && touched.phone ? (
								<div className="message">{errors.phone}</div>
							) : null}
						</div>

						<div className={`item 
						${errors.email && touched.email ? 'error' : ''}`}
						>
							<label htmlFor="email">Почта *</label>
							<Field name="email" placeholder='Введите...' />
							{errors.email && touched.email ? (
								<div className="message">{errors.email}</div>
							) : null}
						</div>

						<div className='buttons'>
							<button
								type="button"
								disabled={isSubmitting}
								className='button'
								onClick={() => navigate("/")
								}>
								Назад
							</button >
							<button
								type='submit'
								disabled={isSubmitting}
								className='button'
							>
								Оплатить
							</button >
						</div>
					</Form>
				)}
			</Formik>

		</div >
	)
}

export default FormPage