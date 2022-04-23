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

const scrollPage = () => {
  setTimeout(() => {
    scrollTo({
      top: 180,
      left: 0,
      behavior: 'smooth'
    });    
  }, 1000)
}

const setCityCardData = async () => {
  const { timeIcon, LocalizedName, WeatherText, Temperature, IsDayTime } = 
    await getCityCardData()
        
    timeIconContainer.innerHTML = timeIcon
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value
    
    timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg'
    
    scrollPage()
    cityForm.reset()
}

const showCityCard = event => {
  event.preventDefault()
  
  const thereIsNoCityCard = cityCard.classList.contains('d-none')

  if (thereIsNoCityCard) {
    cityCard.classList.remove('d-none')
  }

    setCityCardData()
} 

cityForm.addEventListener('submit', showCityCard)