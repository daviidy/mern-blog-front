// src/services/AuthenticationService.ts

interface User {
  username: string;
  email: string;
  password: string;
}

interface Response {
  success: boolean;
  message: string | User;
}

class CommentService {
  private baseUrl: string;

  constructor() {
    // Replace with your authentication API endpoint
    this.baseUrl = "http://localhost:5100/api";
  }

  async store(req: object): Promise<Response | null> {
    try {
      const response = await fetch(`${this.baseUrl}/comments/create`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(req),
      });
      console.log(response);
      if (response.ok) {
        
        const res = await response.json();
        return { success: true, message: res.comment };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  async fetchComments(id: string | undefined): Promise<any[] | null> {
    if (!id) {
      return null;
    }

    const url1 = `${this.baseUrl}/comments/${id}`;
    const url2 = `https://dev.to/api/comments?a_id=${id}`;

    try {
      const response1 = fetch(url1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => response.json());
      const response2 = fetch(url2).then((response) => response.json());

      const results = await Promise.all([response1, response2]);
      console.log(results);
      let comments = [...results[0].comments, ...results[1]];
      comments.sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return null;
    }
  }
}

const commentService = new CommentService();
export default commentService;
