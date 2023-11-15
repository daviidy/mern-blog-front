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

class AuthenticationService {
  private baseUrl: string;

  constructor() {
    // Replace with your authentication API endpoint
    this.baseUrl = 'http://localhost:5100/api'; 
  }

  async login(username: string, password: string): Promise<Response | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const res = await response.json();
        localStorage.setItem('token', JSON.stringify(res.token));
        return {success: true, message: res.token};
      } else {
        return null;
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      return null;
    }
  }

  async register(username: string, password: string, email: string): Promise<Response | null> {
    try {
      console.log({username, password, email})
      const response = await fetch(`${this.baseUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.status === 201) {
        const data = await response.json();
        const user: User = data.user;
        return {success: true, message: user};
      } else if (response.status === 400) {
        return {success: false, message: 'User already exists'};
      } else {
        return {success: false, message: 'Registration failed'};
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}

const authService = new AuthenticationService();
export default authService;
