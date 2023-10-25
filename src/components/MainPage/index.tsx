import { FC, useEffect, useState } from "react";
import { ItemType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss"
import arrow from "./../../assets/icons/arrow.svg"
import { dataAPI } from "../../api/api";


type MainPageType = {
	activeItem: ItemType | null
	setActiveItem: (items: ItemType) => void
}

const MainPage: FC<MainPageType> = ({ activeItem, setActiveItem }) => {


	const [editMode, setEditMode] = useState(false);
	const [items, setItems] = useState([] as ItemType[]);

	useEffect(() => {

		dataAPI.getItems()
			.then(res => {
				if (res.result === 0) {
					setItems(res.data)
				}
			});

	}, [])

	const navigate = useNavigate();

	const handleAddItem = (item: ItemType) => {
		setEditMode(false);
		setActiveItem(item);
	}

	return (
		<div className={styles.body}>
			<div
				onClick={() => setEditMode(prev => !prev)}
				className={styles.input}
			>
				<div className={styles.label}>
					{
						!activeItem
							? <div className={styles.placeholder} >
								Выбeрите товар:
							</div>
							: activeItem.NAME
					}
				</div>

				<img src={arrow} alt="arrow" width={'20px'} />

			</div>

			{
				editMode &&
				<ul className={styles.list}>
					{
						items.map(i =>
							<li className={styles.item}
								key={i.ID}
								onClick={() => handleAddItem(i)} >
								{i.NAME}
							</li>
						)
					}
				</ul>

			}

			{
				activeItem && <div className={styles.block}>
					<div className={styles.price}>
						Цена: <span>{activeItem.SUMMA.split('.')[0]} р.</span>
					</div>
					<button
						onClick={() => navigate(`/form/${activeItem.ID}`)}
					>
						Оформить
					</button>
				</div>
			}
		</div>
	)
}

export default MainPage