import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/comments/commentsSlice";
import { AppDispatch } from "../store";

interface Comment {
  body_html: string;
  user: {
    name: string;
    profile_image: string;
  };
}

// create props interface that takes an id key
interface Props {
  id: string | undefined;
}

const CommentsList: React.FC<Props> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector((state: any) => state.comments.comments);
  console.log(comments);
  const loading = useSelector((state: any) => state.comments.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id))
    }
  }, [id, dispatch]); // The empty dependency array ensures this effect runs only once

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        comments.map((comment: Comment) => (
          <div className="flex mb-4">
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={comment.user.profile_image}
                alt=""
              />
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>{comment.user.name}</strong>{" "}
              <span className="text-xs text-gray-400">3:34 PM</span>
              <p
                dangerouslySetInnerHTML={{ __html: comment.body_html }}
                className="text-sm"
              ></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;
