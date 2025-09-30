const WeatherDisplay = ({ data, compact = false }) => {
  if (!data) return null;

  const { current, daily, location } = data;

  const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className={`text-center ${compact ? 'p-1' : 'p-3'}`}>
      <h2 className="text-xl font-bold mb-1">
        {location?.name}, {location?.country}
      </h2>

      <h1 className={`${compact ? 'text-3xl' : 'text-4xl'} font-bold`}>
        {current.temp.toFixed(1)}°C
      </h1>
      <p className="text-lg">{current.weather[0].description}</p>
      <img
        src={getIcon(current.weather[0].icon)}
        alt="icon"
        className="mx-auto"
      />

      {!compact && (
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {daily.slice(1).map((day, i) => (
            <div
              key={i}
              className="p-3 rounded-xl w-28 text-sm
                           bg-gray-100/50 dark:bg-white/10
                           text-gray-800 dark:text-white 
                           shadow-md"
            >
              <p className="font-semibold">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </p>
              <img
                src={getIcon(day.weather[0].icon)}
                alt="forecast"
                className="mx-auto w-12 h-12"
              />
              <p>{day.main?.temp?.toFixed(1) || 'N/A'}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
