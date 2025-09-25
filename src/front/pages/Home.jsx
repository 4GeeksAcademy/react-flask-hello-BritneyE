import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {SignUp} from "../components/SignupLogin";
export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const token = import.meta.env.VITE_TOKEN
	
	const loadMessage = async () => {
		try {
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}
	const get_user = () => {
		let options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}}
		fetch(backendUrl + "api/user", options)
		.then((resp)=>resp.json())
		.then((data)=>console.log("data is here!!!!!", data))
	}

	useEffect(() => {
		loadMessage()
		get_user()
	}, [])

	return (
		<div className="text-center mt-5">
			Hello!
			
			<SignUp />
		</div>
	);
}; 