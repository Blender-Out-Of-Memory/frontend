import logowithoutbg from "../../assets/logowihtoutbg.png";
import { useAuth } from "../../contexts/AuthProvider";
import DarkmodeButton from "./DarkmodeButton.tsx";

const TopBar = () => {
    const { logout } = useAuth();
    const onclick = () => {
        logout()
    }
    return (
        <div className="bg-secondary-navy h-20 flex flex-row justify-between items-center">
            <div className="w-20 h-20 ml-12">
                <img
                    src={logowithoutbg}
                    className="object-cover w-full h-full"
                ></img>
            </div>
            <div className="text-text-white font-bold text-2xl">
                Blasting through bottlenecks
            </div>
            <div>
                <DarkmodeButton/>
            </div>
            <div className="mr-12">
                <div onClick={onclick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#FF7A00"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-12"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
