import actionImg from "../assets/action.png";
import dramaImg from "../assets/drama.png";
import romanceImg from "../assets/romance.png";
import thrillerImg from "../assets/thriller.png";
import westernImg from "../assets/western.png";
import horrorImg from "../assets/horror.png";
import fantasyImg from "../assets/fantasy.png";
import musicImg from "../assets/music.png";
import fictionImg from "../assets/fiction.png";

/**
 * CATEGORIES
 *
 * Single source of truth for the category grid.
 * Add/remove entries here — the UI renders automatically.
 *
 * `color` is the card background color matching the Figma.
 */
const CATEGORIES = [
  { id: "action",  label: "Action",  image: actionImg,  color: "#e84118" },
  { id: "drama",   label: "Drama",   image: dramaImg,   color: "#9b59b6" },
  { id: "romance", label: "Romance", image: romanceImg, color: "#27ae60" },
  { id: "thriller",label: "Thriller",image: thrillerImg,color: "#5dade2" },
  { id: "western", label: "Western", image: westernImg, color: "#922b21" },
  { id: "horror",  label: "Horror",  image: horrorImg,  color: "#7d3c98" },
  { id: "fantasy", label: "Fantasy", image: fantasyImg, color: "#e91e8c" },
  { id: "music",   label: "Music",   image: musicImg,   color: "#c0392b" },
  { id: "fiction", label: "Fiction", image: fictionImg, color: "#1e8449" },
];

export default CATEGORIES;
