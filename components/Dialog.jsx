const Dialog = ({ title }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <div className="flex justify-end w-full"></div>
      </div>
    </div>
  );
};

export default Dialog;
