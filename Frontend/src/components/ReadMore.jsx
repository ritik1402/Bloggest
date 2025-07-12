import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReadMore = ({ text, maxLength, id }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${id}`);
  };

  if (text.length <= maxLength) {
    return (
      <p className="break-words text-justify">{text}</p>
    );
  }

  return (
    <div>
      <p>{text.substring(0, maxLength)}...</p>
      <button
        onClick={handleReadMore}
        className="text-sm font-bold text-[#00ADB5] underline mt-2 cursor-pointer"
      >
        Read More
      </button>
    </div>
  );
};

export default ReadMore;
