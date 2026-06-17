// API service for Eleonora Bonucci client-side actions and backend connection

/**
 * Subscribes an email to the newsletter.
 * Backend Endpoint: POST /api/newsletter/subscribe
 * @param {string} email
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function subscribeNewsletter(email) {
  // Keeping as mock for now, can be connected later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Subscribed successfully!" });
    }, 1000);
  });
}

/**
 * Logs in a user with email and password.
 * Backend Endpoint: POST /api/v1/users/login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, token?: string, message?: string}>}
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      user: data.user,
      token: data.token || 'fake-jwt-token',
      message: data.message
    };
  } catch (error) {
    console.error('API Error: loginUser failed', error);
    throw error;
  }
}

/**
 * Registers a new user.
 * Backend Endpoint: POST /api/v1/users/register
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, message?: string}>}
 */
export async function registerUser(username, email, password) {
  try {
    const response = await fetch('/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return {
      success: true,
      user: data.user,
      message: data.message
    };
  } catch (error) {
    console.error('API Error: registerUser failed', error);
    throw error;
  }
}

/**
 * Logs out a user.
 * Backend Endpoint: POST /api/v1/users/logout
 * @param {string} email
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function logoutUser(email) {
  try {
    const response = await fetch('/api/v1/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    console.error('API Error: logoutUser failed', error);
    throw error;
  }
}

/**
 * Fetches all posts from the backend.
 * Backend Endpoint: GET /api/v1/posts/getPosts
 * @returns {Promise<{success: boolean, data: array}>}
 */
export async function getPosts() {
  try {
    const response = await fetch('/api/v1/posts/getPosts');
    if (!response.ok) {
      let errorMessage = 'Failed to fetch posts';
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (e) {
        errorMessage = `Server returned status ${response.status}. Please check if your backend server is running on port 4000.`;
      }
      throw new Error(errorMessage);
    }
    const data = await response.json();
    // The endpoint returns a JSON array of posts
    return { success: true, data };
  } catch (error) {
    console.error('API Error: getPosts failed', error);
    throw error;
  }
}

/**
 * Creates a new post on the backend.
 * Backend Endpoint: POST /api/v1/posts/create
 * @param {object} postData
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function createPost(postData) {
  try {
    const response = await fetch('/api/v1/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create post';
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (e) {
        errorMessage = `Server returned status ${response.status}. Please check if your backend server is running on port 4000.`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { success: true, data: data.post };
  } catch (error) {
    console.error('API Error: createPost failed', error);
    throw error;
  }
}

/**
 * Updates a post on the backend.
 * Backend Endpoint: PATCH /api/v1/posts/update/:id
 * @param {string} id
 * @param {object} postData
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function updatePost(id, postData) {
  try {
    const response = await fetch(`/api/v1/posts/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update post';
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (e) {
        errorMessage = `Server returned status ${response.status}. Please check if your backend server is running on port 4000.`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { success: true, data: data.post };
  } catch (error) {
    console.error('API Error: updatePost failed', error);
    throw error;
  }
}

/**
 * Deletes a post on the backend.
 * Backend Endpoint: DELETE /api/v1/posts/delete/:id
 * @param {string} id
 * @returns {Promise<{success: boolean}>}
 */
export async function deletePost(id) {
  try {
    const response = await fetch(`/api/v1/posts/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete post';
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (e) {
        errorMessage = `Server returned status ${response.status}. Please check if your backend server is running on port 4000.`;
      }
      throw new Error(errorMessage);
    }

    try {
      await response.json();
    } catch (e) {
      // ignore parsing error for successful empty responses
    }
    return { success: true };
  } catch (error) {
    console.error('API Error: deletePost failed', error);
    throw error;
  }
}

// -------------------------------------------------------------
// The following are mock endpoints for checkout/orders/products
// -------------------------------------------------------------

/**
 * Places a new order.
 * Backend Endpoint: POST /api/orders
 * @param {object} orderData
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function placeOrder(orderData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: orderData });
    }, 1000);
  });
}

/**
 * Fetches all orders.
 * Backend Endpoint: GET /api/orders
 * @returns {Promise<{success: boolean, data: array}>}
 */
export async function getOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: [] });
    }, 1000);
  });
}

/**
 * Fetches all products.
 * Backend Endpoint: GET /api/products
 * @returns {Promise<{success: boolean, data: array}>}
 */
export async function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: [] });
    }, 1000);
  });
}

/**
 * Updates a product by ID.
 * Backend Endpoint: PUT /api/products/:id
 * @param {string|number} id
 * @param {object} data
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function updateProduct(id, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { id, ...data } });
    }, 1000);
  });
}

/**
 * Creates a new product.
 * Backend Endpoint: POST /api/products
 * @param {object} data
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function createProduct(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { id: Date.now(), ...data } });
    }, 1000);
  });
}

/**
 * Updates an order status.
 * Backend Endpoint: PATCH /api/orders/:id/status
 * @param {string} id
 * @param {string} status
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function updateOrderStatus(id, status) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { id, status } });
    }, 1000);
  });
}

/**
 * Fetches all registered customers.
 * Backend Endpoint: GET /api/customers
 * @returns {Promise<{success: boolean, data: array}>}
 */
export async function getCustomers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: [] });
    }, 1000);
  });
}
