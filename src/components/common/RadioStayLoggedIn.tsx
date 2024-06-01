function RadioStayLoggedIn() {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input type="checkbox" id="stayLoggedIn" name="stayLoggedIn" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="stayLoggedIn" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary">Stay Logged In</label>
            </div>
        </div>);
}

export default RadioStayLoggedIn