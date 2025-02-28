import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
const SearchBar = ({ data }) => {
  const {navigate} = useContext(AppContext)
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (event) => {
    event.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <img
        className="md:w-auto w-10 px-3 "
        src={assets.search_icon}
        alt="search_icon"
      />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-full h-full outline-none text-gray-500/80"
        type="text"
        placeholder="Search for courses"
      />
      <button
        className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
