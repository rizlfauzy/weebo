import { useCallback, useEffect, useRef } from "react";
import useAsync from "../hooks/useAsync";
import { get_data } from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { create_list } from "../hooks/useStore";

const { VITE_ANIME_API } = import.meta.env;

export default function Navbar() {
  const { run, isLoading, data } = useAsync();
  const dispatch = useDispatch();
  const delay = useRef("");
  const list = useSelector((state) => state.animes.list);

  const on_change = useCallback((e) => {
    clearTimeout(delay.current);
    delay.current = setTimeout(() => {
      const url = e.target.value.length === 0 ? `${VITE_ANIME_API}top/anime?limit=6` : `${VITE_ANIME_API}anime?q=${e.target.value}&limit=6`;
      run(get_data({ url, host: "/" }));
    }, 1000);
  }, [run]);

  useEffect(() => {
    const obj = !isLoading
      ? data?.data?.map((item) => {
          return {
            id: item.mal_id,
            title: item.title,
            year: item.year,
            image: item.images.jpg.image_url,
            score: item.score,
            synopsis: item.synopsis,
          };
        })
      : [];
    dispatch(create_list(obj));
  }, [data, isLoading,dispatch]);


  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍥</span>
        <h1>WeeBoo</h1>
        <span role="img">🍥</span>
      </div>
      <div className="search-container">
        <input className="search" type="text" placeholder="Search anime..." onChange={on_change} />
        <p className="search-results">
          Found <strong>{list.length || 0}</strong> results
        </p>
      </div>
    </nav>
  );
}