import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const apiUrl = "https://api.github.com";

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	//NOTE - get search results
	const searchUsers = async (text) => {
		setLoading();

		const params = new URLSearchParams({
			q: text,
		});

		const response = await fetch(`${apiUrl}/search/users?${params}`);
		const { items } = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: items,
		});
	};

	//NOTE - set loading
	const setLoading = () => {
		dispatch({
			type: "SET_LOADING",
		});
	};

	//NOTE - Clear users from state
	const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				searchUsers,
				clearUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
