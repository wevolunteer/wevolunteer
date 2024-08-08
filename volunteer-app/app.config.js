const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

module.exports = ({ config }) => {
  config.android.config.googleMaps.apiKey = GOOGLE_MAPS_API_KEY;

  return {
    ...config,
  };
};
