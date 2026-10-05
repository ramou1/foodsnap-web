export interface FoodTrend {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  isFavorite: boolean;
}

export const FOOD_TRENDS: FoodTrend[] = [
  {
    id: "1",
    title: "Plant-Based Diets",
    category: "Vegan",
    caption: "A focus on whole foods, plant-based diets, and organic ingredients.",
    image: "/images/food08.jpg",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Italian Cuisine",
    category: "Italian",
    caption: "Increased popularity of vegan and vegetarian diets.",
    image: "/images/food15.png",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Global Flavors",
    category: "Asian",
    caption: "Exploration of international cuisines and fusion dishes.",
    image: "/images/food11.jpg",
    isFavorite: false,
  },
  {
    id: "4",
    title: "BBQ",
    category: "Churras",
    caption: "Grilling and smoking techniques for meats and vegetables.",
    image: "/images/food21.jpg",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Functional Foods",
    category: "Health",
    caption: "Foods that provide health benefits beyond basic nutrition.",
    image: "/images/food14.jpg",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Desserts",
    category: "Desserts",
    caption: "Innovative and indulgent dessert creations.",
    image: "/images/food18.jpg",
    isFavorite: false,
  },
  {
    id: "7",
    title: "Farm-to-Table",
    category: "Non-Tolerant",
    caption: "A focus on locally sourced and seasonal ingredients.",
    image: "/images/food20.jpg",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Fast Food",
    category: "Fast Food",
    caption: "Convenient and quick meal options.",
    image: "/images/food06.jpg",
    isFavorite: false,
  },
];
