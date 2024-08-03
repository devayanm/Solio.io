import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
});

const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await api.post("/login", userData);

    console.log("Login Response:", response); // Log the response

    const { data } = response || {};
    const { accessToken, refreshToken } = data.data || {}; // Access accessToken and refreshToken from response.data.data

    if (!accessToken || !refreshToken) {
      throw new Error("Access token or refresh token not provided");
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Failed to login: " + error.message);
    }
  }
};

const logoutUser = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const response = await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw new Error("Logout failed");
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await api.post("/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const changeCurrentPassword = async (passwordData) => {
  try {
    const response = await api.post("/change-password", passwordData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getCurrentUser = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await api.get("/current-user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Failed to fetch user data: " + error.message);
    }
  }
};

const updateAccountDetails = async (accountData) => {
  try {
    const response = await api.patch("/update-account", accountData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateUserAvatar = async (avatarData) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarData);

    const response = await api.patch("/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateUserCoverImage = async (coverImageData) => {
  try {
    const formData = new FormData();
    formData.append("coverImage", coverImageData);

    const response = await api.patch("/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const help = async () => {
  try {
    const response = await api.get(`/help`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  help,
};
