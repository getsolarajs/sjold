const { AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const play = require('play-dl');
module.exports = {
    name: "$voiceSkip", description: "Skips the current song and plays the next in queue.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (!guildVoiceState?.player || guildVoiceState.player.state.status === AudioPlayerStatus.Idle) return "[Error: Nothing to skip]";

        // Stop current playback which triggers the 'idle' listener to play next
        guildVoiceState.player.stop(true);
        // Manually trigger next if needed (idle listener might have race conditions)
        const nextSong = guildVoiceState.queue.shift();
        if (nextSong) {
            try {
                const stream = await play.stream(nextSong.url);
                const resource = createAudioResource(stream.stream, { inputType: stream.type });
                guildVoiceState.player.play(resource);
                guildVoiceState.nowPlaying = nextSong.title;
                return `Skipped. Now Playing: **${nextSong.title}**`;
            } catch (playError) { console.error("Error playing next on skip:", playError); return "[Error playing next song after skip]"; }
        } else {
             guildVoiceState.nowPlaying = null;
             return "Skipped. Queue is now empty.";
        }
        
        return "Skipped current song."; 
    }
};