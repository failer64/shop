import axios from "axios";
import { ItemType } from "../types/types";

type ResponseType = {
	result: number
	resultdescription: string
	data: ItemType[]
}

export const dataAPI = {
	getItems() {
		return (axios.get<ResponseType>
			('https://sycret.ru/service/api/api?MethodName=OSGetGoodList&ApiKey=011ba11bdcad4fa396660c2ec447ef14')
			.then(response => response.data));
	},
	sendInfo() {
		return (axios.post<ResponseType>('https://sycret.ru/service/api/api?MethodName=OSSale&ApiKey=011ba11bdcad4fa396660c2ec447ef14',
		)
			.then(response => response.data));
	}

}