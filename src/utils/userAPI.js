const CreateUserURL = "http://localhost:5000/api/user/add";

// Fetcher function for SWR
export const fetcher = (url) => fetch(url).then(res => res.json());

// Create a new user using POST request
export const createUser = async (userData) => {
  const response = await fetch(CreateUserURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
};
