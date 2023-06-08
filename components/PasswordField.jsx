const PasswordField = ({
  password,
  handleChangePassword,
  passwordError,
  showPassword,
  handleTogglePassword,
}) => {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChangePassword}
          className={`w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-400 dark:bg-gray-800 focus:outline-none ${
            passwordError ? "border-red-400" : ""
          } `}
          placeholder="Enter your password"
        />
        <span className="text-red-400">{passwordError}</span>
      </div>
      <div>
        <input
          type="checkbox"
          name="showpassword"
          onClick={handleTogglePassword}
          className="w-4 h-4 mr-1 checked:bg-blue-500"
        />
        <label htmlFor="showpassword">Show password</label>
      </div>
    </div>
  );
};

export default PasswordField;
