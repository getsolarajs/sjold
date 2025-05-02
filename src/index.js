const SolaraClient = require('./core/SolaraClient');
const StopExecutionError = require('./errors/StopExecutionError');
const constants = require('./utils/constants');
const discordMappings = require('./utils/discordMappings');

module.exports = {
    SolaraClient,
    StopExecutionError,
    Constants: constants,
    DiscordMappings: discordMappings,
};