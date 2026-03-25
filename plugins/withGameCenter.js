const { withEntitlementsPlist, withInfoPlist } = require('expo/config-plugins');

function withGameCenter(config) {
    config = withEntitlementsPlist(config, (config) => {
        config.modResults['com.apple.developer.game-center'] = true;
        return config;
    });

    config = withInfoPlist(config, (config) => {
        if (!config.modResults.UIRequiredDeviceCapabilities) {
            config.modResults.UIRequiredDeviceCapabilities = [];
        }
        if (
            !config.modResults.UIRequiredDeviceCapabilities.includes(
                'gamekit'
            )
        ) {
            config.modResults.UIRequiredDeviceCapabilities.push('gamekit');
        }
        return config;
    });

    return config;
}

module.exports = withGameCenter;
