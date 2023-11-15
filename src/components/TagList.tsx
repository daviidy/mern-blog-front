import React from "react";

interface TagListProps {
  tagList: string[];
}
const TagList: React.FC<TagListProps> = ({tagList}) => {
  return (
    <div className="mb-2">
      {tagList.length > 0 && tagList.map((tag, index) => (
        <span
          key={index}
          className="text-opacity-50 text-sm text-gray-600 p-1 hover:text-black"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagList;