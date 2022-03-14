const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
let timeImg = document.querySelector('[data-js="time"]')

const getCityCardData = async () => {
  const inputValue = cityForm.city.value
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await 
    getCityWeather(Key)
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg">`

  return {timeIcon, LocalizedName, WeatherText, Temperature, IsDayTime}
}

const showCityCard = () => {
  const cityCardIsNotDisplaying = cityCard.classList.contains('d-none')
  if (cityCardIsNotDisplaying) {
    cityCard.classList.remove('d-none')
  }  
}

const setCityCardData = async () => {
  const cityCardData = await getCityCardData()

  const { 
    timeIcon,
    LocalizedName,
    WeatherText,
    Temperature,
    IsDayTime } = cityCardData
    
  timeIconContainer.innerHTML = timeIcon
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
  
  timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg'
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

const handleCityCard = async event => {
  event.preventDefault() 

  showCityCard()
  setCityCardData()  
  scrollPage()  

  cityForm.reset()
}

cityForm.addEventListener('submit', handleCityCard)