import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import "../../styles/private.css";
import imgLogo from "../../img/img-logo.webp";
import user from "../../img/user.webp";
import api from './../api';





const endSession = async () => {

	const token = localStorage.getItem("token")
	const nomUsuario = localStorage.getItem("usename")




	await api.get("/logout", { headers: { Authorization: `Bearer ${token}` } })
		.then(response => {
			console.log("Datos obtenidos correctamente:", response.data);

			localStorage.removeItem("username");
			localStorage.removeItem("email");
			localStorage.removeItem("picture");
			localStorage.removeItem("token");
			window.location.href = "/login";
		})
		.catch(error => {
			console.error("Error al cerrar sesión:", error);
			localStorage.removeItem("username");
			localStorage.removeItem("email");
			localStorage.removeItem("picture");
			localStorage.removeItem("token");
			window.location.href = "/login";
		});
}

export const Navbar = () => {

	const [logo, setLogo] = useState(user);
	const desconocido = "desconocido";
	const nomUsuario = localStorage.getItem("username") || desconocido;

	useEffect(() => {
		const interval = setInterval(() => {
			const storedLogo = localStorage.getItem("picture") || user;
			if (storedLogo !== logo) {
				setLogo(storedLogo);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [logo]);


	const location = useLocation();
	const hideNavbarOn = ["/"]
	const handleGoInicio = () => {
		window.location.href = `/`;
	};
	return (
		<nav id="navbar" className={`navbar navbar-expand-lg px-4 text-white ${hideNavbarOn.includes(location.pathname) ? "hidden" : ""}`}>
			<a className="btn d-flex align-items-center" onClick={handleGoInicio}>
				<img
					src={imgLogo}
					alt="Company Logo"
					className="rounded-circle"
					width="40"
					height="40"
				/>
				<span className="ms-2 fw-bold text-light">LinkUp</span>
			</a>
			<div className="ms-auto d-flex align-items-center">
				<div className="dropdown">
					<a className="btn dropdown-toggle text-white text-decoration-underline" data-bs-toggle="dropdown" aria-expanded="false">
						Hi, {nomUsuario}
					</a>

					<ul className="dropdown-menu">
						<li>
							<a className="dropdown-item" href="/profile">Perfil</a>
						</li>
						<li>
							<a className="dropdown-item" onClick={endSession}>Cerrar sesión</a>
						</li>
					</ul>
				</div>
				<img
					src={logo}
					alt="User Avatar"
					className="rounded-circle"
					width="40"
					height="40"
				/>
			</div>
		</nav>
	);
};
