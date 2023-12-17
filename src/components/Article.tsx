import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

interface ArticleObj {
  title: string;
  cover_image: string;
  readable_publish_date: string;
  comments_count: number;
  reading_time_minutes: number;
  body_html: string;
  user: {
    name: string;
    profile_image: string;
  };
}
const Article: React.FC = () => {
  const { id } = useParams();

  const [article, setArticle] = useState<ArticleObj>({
    title: "",
    cover_image: "",
    readable_publish_date: "",
    comments_count: 0,
    reading_time_minutes: 0,
    body_html: "",
    user: {
      name: "",
      profile_image: "",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch articles when the component mounts
    fetch(`https://dev.to/api/articles/${id}`)
      .then((response) => response.json())
      .then((data: ArticleObj) => {
        setArticle(data);
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [id]);

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src={article.user.profile_image}
                    alt={article.user.name}
                  />
                  <div>
                    <a
                      href="/"
                      rel="author"
                      className="text-xl font-bold text-gray-900"
                    >
                      {article.user.name}
                    </a>
                    <p className="text-base text-gray-500">Author</p>
                    <p className="text-base text-gray-500 ">
                      <time>{article.readable_publish_date}</time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                {article.title}
              </h1>
            </header>
            <div dangerouslySetInnerHTML={{ __html: article.body_html }}></div>
            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                  Discussion ({article.comments_count})
                </h2>
              </div>
              <div className="antialiased mx-auto max-w-screen-sm">
                <div className="space-y-4">
                  <CommentForm id={id} />
                  <CommentsList id={id} />
                </div>
              </div>
            </section>
          </article>
        </div>
      )}
    </main>
  );
};

export default Article;
