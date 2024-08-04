import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
});


const handleApiError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || "An unexpected error occurred.";
  } else if (error.request) {
    return "Network error. Please check your internet connection.";
  } else {
    return "An unexpected error occurred: " + error.message;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

const loginUser = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    const { data } = response || {};
    const { accessToken, refreshToken } = data.data || {};

    if (!accessToken || !refreshToken) {
      throw new Error("Access token or refresh token not provided");
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return data;
  } catch (error) {
    throw new Error(handleApiError(error));
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
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await api.patch("/update-account", accountData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Failed to update account details: " + error.message);
    }
  }
};


const updateUserAvatar = async (avatarFile) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await api.patch("/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Failed to update avatar: " + error.message);
    }
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
