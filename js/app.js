const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
let timeImg = document.querySelector('[data-js="time"]')

const getCityCardData = async inputValue => {  
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await 
    getCityWeather(Key)
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg">`

  return {timeIcon, LocalizedName, WeatherText, Temperature, IsDayTime}
}

const scrollPage = () => {
  setTimeout(() => {
    scrollTo({
      top: 180,
      left: 0,
      behavior: 'smooth'
    });    
  }, 1000)
}

const setCityCardData = async inputValue => {
  const { timeIcon, LocalizedName, WeatherText, Temperature, IsDayTime } = 
    await getCityCardData(inputValue)
        
  timeIconContainer.innerHTML = timeIcon
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value

  if (cityCard.classList.contains('d-none')) {
    cityCard.classList.remove('d-none')
  }
    
  timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg'
    
  localStorage.setItem('city', inputValue)

  scrollPage()
  cityForm.reset()
}

const showCityCard = event => {
  event.preventDefault()
  const inputValue = event.target.city.value

  setCityCardData(inputValue)
}

const showLocalStorageCity = () => {
  const city = localStorage.getItem('city')

  if (city) {
    setCityCardData(city)
  }
}

cityForm.addEventListener('submit', showCityCard)
showLocalStorageCity()