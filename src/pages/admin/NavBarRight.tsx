import { Link } from "react-router-dom";

export default function NavBarRight({ options }) {
    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="mb-6 text-2xl font-bold">OPCIONES:</h1>
            <ul className="list-none p-0 m-0">
                {options.map((option, index) => (
                    <li key={index} className="mb-4">
                        <Link to={option.path} className="text-blue-500 text-lg hover:text-blue-700 transition-colors duration-300">
                            {option.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
