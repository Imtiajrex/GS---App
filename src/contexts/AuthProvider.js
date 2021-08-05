import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
export default function AuthProvider(props) {
	const [user, setUser] = useState(null);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{props.children}
		</AuthContext.Provider>
	);
}
