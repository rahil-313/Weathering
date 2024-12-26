
const SearchSection = ({getWeatherDetails, searchInputRef }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    //Handles city search form submission
    const handleCitySearch = (e) =>{
        e.preventDefault();
        const searchInput = e.target.querySelector(".search-input");
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL);//fetches weather details for the entered city
    };
    //Gets user's current location (latitude / longitude)
    const handleLocationSearch = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const{ latitude, longitude} = position.coords;
          const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
          getWeatherDetails(API_URL);//fetches weather details for the user's current location
          window.innerWidth >= 768 && searchInputRef.current.focus();
        },
        () => {
          alert("location access denied. Please enable permissions to use this feature.");
        }
      )
    }

  return (
    <div className="search-section">
    <form action="#" className="search-form" onSubmit={handleCitySearch}>
    <span className="material-symbols-rounded">search</span>
      <input type="search" placeholder="Enter a city name" ref={searchInputRef} className="search-input" required/>
    </form>
    <button className="location-button" onClick={handleLocationSearch}>
    <span className="material-symbols-rounded">my_location</span>   
    </button>
  </div>
  )
}

export default SearchSection
