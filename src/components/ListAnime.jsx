import useAsync from "../hooks/useAsync";
import { useEffect, useLayoutEffect, useCallback } from "react";
import { get_data } from "../hooks/useFetch";
import { create_list, selected_anime } from "../hooks/useStore";
import { useSelector, useDispatch } from "react-redux";

const { VITE_ANIME_API } = import.meta.env;

export default function ListAnime() {
  const { run, data, isLoading } = useAsync();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.animes.list);

  useEffect(() => {
    run(get_data({ url: `${VITE_ANIME_API}top/anime?limit=6`, host: "/" }));
  }, [run]);

  useLayoutEffect(() => {
    const obj =
      !isLoading ?
      data?.data?.map((item) => {
        return {
          id: item.mal_id,
          title: item.title,
          year: item.year,
          image: item.images.jpg.image_url,
          score: item.score,
          synopsis: item.synopsis,
        };
      }) : [];
    dispatch(create_list(obj));
    dispatch(selected_anime(obj[0] || {
      id: 0,
      title: "",
      year: "",
      image: "",
      score: "",
      synopsis: "",
    }))
  }, [data, isLoading, dispatch]);

  const on_click = useCallback((item) => {
    dispatch(selected_anime(item));
  }, [dispatch]);

  return (
    <ul className="list list-anime">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        list?.map((item) => {
          return (
            <li key={item.id} className="list-item" onClick={on_click.bind(this, item)}>
              <img src={item.image} alt={`${item.title} cover`} />
              <h3>{item.title}</h3>
              <p>{item.year}</p>
            </li>
          );
        })
      )}
    </ul>
  );
}
