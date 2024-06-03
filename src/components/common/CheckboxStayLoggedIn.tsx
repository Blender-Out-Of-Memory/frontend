function CheckboxStayLoggedIn() {
    return (
        <div className="flex items-start bg-background-secondary">
            <div className="flex items-center h-5 bg-background-secondary">
                <input
                    type="checkbox"
                    id="stayLoggedIn"
                    name="stayLoggedIn"
                    />
            </div>
            <div className="ml-3 text-sm bg-background-secondary">
                <label htmlFor="stayLoggedIn" className="w-4 h-4 bg-background-secondary text-text-normal border border-background-secondary rounded focus:ring-3 focus:ring-primary">Stay Logged In</label>
            </div>
        </div>);
}

export default CheckboxStayLoggedIn