import axios from "axios";
import cookie from "react-cookies";
import { transformDateFormat } from "../Utils/ultil";

export const refreshValidation = async () => {
  try {
    const refreshToken = cookie.load("refreshToken");
    const newAccessToken = await axios.post("/members/token/refresh/", {
      refresh: refreshToken,
    });
    cookie.remove("accessToken", {
      path: "/",
    });
    cookie.save("accessToken", newAccessToken.data.access, {
      path: "/",
    });
    return true;
  } catch (e) {
    console.log("refresh 실패, 로그아웃 처리 필요");
    return false;
  }
};

export const isLogin = async () => {
  const accessToken = cookie.load("accessToken");
  if (accessToken) return true;
  return await refreshValidation();
};

export const movieApi = {
  getMovies: () => axios.get("movies/"),
  getMovie: (id) => axios.get(`{movies/${id}`),
  getSchedules: ({ date, movies, theaterId }) => {
    let movieIds = "";
    if (movies) {
      movieIds = movies.reduce((acc, cur) => acc + "+" + cur.id, "").slice(1);
    }

    if (date) date = transformDateFormat(date).dateStringNoDash;

    if (date && theaterId && !movies) {
      return axios.get(`theaters/${theaterId}/schedules/${date}`);
    } else {
      return axios.get(
        `theaters/${theaterId}/schedules/${date}/?movies=${movieIds}`
      );
    }
  },
  getScreeningRegions: (date, movies) => {
    let movieIds = "";
    if (movies) {
      movieIds = movies.reduce((acc, cur) => acc + "+" + cur.id, "").slice(1);
    }
    const call = `theaters/schedules/regions/${date}/${
      movies ? "?movies=" + movieIds : ""
    }
    `;
    return axios.get(call);
  },
  getScreeningTheaters: (date, movies) => {
    let movieIds = "";
    if (movies) {
      movieIds = movies.reduce((acc, cur) => acc + "+" + cur.id, "").slice(1);
    }

    const call = `theaters/schedules/${date}/${
      movies ? "?movies=" + movieIds : ""
    }
    `;

    return axios.get(call);
  },
  getSeats: (scheduleId) => {
    return axios.get(`/schedules/${scheduleId}/seats/`);
  },
};

export const userApi = {
  signup: ({ name, id, pw, pwCheck, birth, tell, email }) => {
    return axios.post("/members/signup/", {
      username: id,
      email: email,
      password1: pw,
      password2: pwCheck,
      name: name,
      mobile: tell,
      birth_date: birth,
    });
  },
  login: ({ id, pw }) => {
    return axios.post("/members/login/", {
      username: id,
      password: pw,
    });
  },
  logout: () => {
    cookie.remove("accessToken", {
      path: "/",
    });
    cookie.remove("refreshToken", {
      path: "/",
    });
    return axios.post("/members/logout/");
  },
};
