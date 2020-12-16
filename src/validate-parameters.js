module.exports = function validateParameters(parameters) {
  //  Validate or assign the source icon.
  const sourceIcon = parameters.sourceIcon || 'icon.png';

  //  Validate or assign the search path.
  const searchRoot = parameters.searchRoot || './';

  //  Validate or assign the platforms.
  const platformsString = parameters.platforms || 'android,ios';

  const platforms = platformsString.split(',');
  for (let i = 0; i < platforms.length; i += 1) {
    if (!/android|ios/.test(platforms[i])) {
      throw new Error(`${platforms[i]} is not a valid platform.`);
    }
  }

  //  Validate or assign the adaptive icons flag.
  //  Set default values for the adaptive icons paths.
  const adaptiveIcons = !!parameters.adaptiveIcons;
  const backgroundIcon = parameters.backgroundIcon || 'icon.background.png';
  const foregroundIcon = parameters.foregroundIcon || 'icon.foreground.png';

  //  Validate or assign the notification icons flag.
  //  Set default value for the notification icon path.
  const notificationIcons = !!parameters.notificationIcons;
  const notificationIcon = parameters.notificationIcon || 'notification.png';

  return {
    sourceIcon,
    backgroundIcon,
    foregroundIcon,
    notificationIcon,
    searchRoot,
    platforms,
    adaptiveIcons,
    notificationIcons,
  };
};
