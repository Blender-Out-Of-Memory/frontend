import logowithoutbg from "../../assets/logowihtoutbg.png";
import { useAuth } from "../../contexts/AuthProvider";

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
            <button className="mr-12 text-white" onClick={onclick}>
                Logout
            </button>
        </div>
    );
}

export default TopBar;
