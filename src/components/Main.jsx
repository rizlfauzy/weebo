import Box from "./Box";
import ListAnime from "./ListAnime";
import SelectedAnime from "./SelectedAnime";

export default function Main() {
  return (
    <main className="main">
      <Box>
        <ListAnime />
      </Box>
      <Box>
        <SelectedAnime />
      </Box>
    </main>
  );
}
