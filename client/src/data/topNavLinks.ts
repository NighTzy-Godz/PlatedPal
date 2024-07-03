import CommunityIcon from "../components/icons/CommunityIcon";
import HomeIcon from "../components/icons/HomeIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import PlannerIcon from "../components/icons/PlannerIcon";
import SavedIcon from "../components/icons/SavedIcon";
import SearchIcon from "../components/icons/SearchIcon";
import ShopIcon from "../components/icons/ShopIcon";

const authenticatedLinks = [
  {
    id: 5,
    name: "Feed",
    path: "/",
    icon: HomeIcon,
  },
  {
    id: 0,
    name: "Recipes",
    path: "/recipes",
    active: true,
    icon: SearchIcon,
  },
  {
    id: 1,
    name: "Shopping",
    path: "/shopping",
    icon: ShopIcon,
  },
  {
    id: 2,
    name: "Meal Planner",
    path: "/meal-planner",
    icon: PlannerIcon,
  },
  {
    id: 3,
    name: "Communities",
    path: "/communities",
    icon: CommunityIcon,
  },
  {
    id: 4,
    name: "Saved",
    path: "/saved",
    icon: SavedIcon,
  },
];

const unauthenticatedLinks = [
  {
    id: 0,
    name: "Recipes",
    path: "/recipes",
    active: true,
  },
  {
    id: 1,
    name: "Shopping",
    path: "/shopping",
  },
  {
    id: 2,
    name: "Meal Planner",
    path: "/meal-planner",
  },
  {
    id: 3,
    name: "Communities",
    path: "/communities",
  },
];

export { unauthenticatedLinks, authenticatedLinks };
