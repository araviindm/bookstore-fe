const EmailField = ({ email, handleChangeEmail, emailError }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium dark:border-gray-400 dark:text-slate-200"
      >
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={handleChangeEmail}
        className={`w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-400 focus:outline-none dark:bg-gray-800 ${
          emailError ? "border-red-400" : ""
        }`}
        placeholder="Enter your email"
      />
      <span className="text-red-400">{emailError}</span>
    </div>
  );
};

export default EmailField;
