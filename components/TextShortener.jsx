const TextShortener = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <div className="truncate">{truncatedText}</div>;
};

export default TextShortener;
