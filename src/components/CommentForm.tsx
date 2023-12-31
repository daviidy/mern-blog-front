import React, { useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { storeComment } from "../redux/comments/commentsSlice";
import { AppDispatch } from "../store";

interface Comment {
  body_html: string;
  user_id: string;
}

interface Props {
  id: string | undefined;
}

const CommentForm: React.FC<Props> = ({id}) => {
  const [comment, setComment] = useState<Comment>({
    body_html: "",
    user_id: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector((state: any) => state.comments.comments);
  console.log(comments);
  const loading = useSelector((state: any) => state.comments.loading);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(storeComment(comment));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setComment((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: JSON.parse(localStorage.getItem("user") || "{}")._id,
      article_id: id
    }));
  };

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mb-4 max-w-lg">
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleAddComment}
          className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Add a new comment
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body_html"
                placeholder="Type Your Comment"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                <svg
                  fill="none"
                  className="w-5 h-5 text-gray-600 mr-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
              </div>
              <div className="-mr-1">
                <input
                  type="submit"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Post Comment"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
