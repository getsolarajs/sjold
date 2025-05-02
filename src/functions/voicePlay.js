// Filename: commands/voicePlay.js
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const play = require('play-dl');

async function playTrack(guildId, client, youtubeCookie) {
    const guildVoiceState = client.voiceManager.get(guildId);
    if (!guildVoiceState || !guildVoiceState.connection || guildVoiceState.connection.state.status === VoiceConnectionStatus.Destroyed) {
        console.log(`Solara [${guildId}]: Playback stopped - Invalid voice state or connection destroyed.`);
        if (guildVoiceState) client.voiceManager.delete(guildId);
        return;
    }

    const { player, queue, connection } = guildVoiceState;

    player.removeAllListeners();

    if (queue.length === 0) {
        console.log(`Solara [${guildId}]: Queue is empty. Stopping player and preparing to leave.`);
        guildVoiceState.nowPlaying = null;
        player.stop(true);

         if (connection.state.status !== VoiceConnectionStatus.Destroyed && connection.state.status !== VoiceConnectionStatus.Destroying) {
            console.log(`Solara [${guildId}]: Destroying connection due to empty queue.`);
            connection.destroy();
         } else {
              console.log(`Solara [${guildId}]: Connection already destroyed or destroying.`);
         }
        return;
    }

    const nextSong = queue.shift();
    guildVoiceState.nowPlaying = nextSong.title;
    const trackCookie = nextSong.youtubeCookie;
    console.log(`Solara [${guildId}]: Attempting to play track: ${nextSong.title} (URL: ${nextSong.url})`);
     if (trackCookie) {
          console.log(`Solara [${guildId}]: Using provided cookie for streaming this track.`);
     } else {
          console.log(`Solara [${guildId}]: No cookie provided for this track.`);
     }

    const stateChangeLogger = (oldState, newState) => {
        console.log(`Solara [${guildId}]: Player state changed from ${oldState.status} to ${newState.status} for track: ${guildVoiceState.nowPlaying || 'N/A'}`);
        if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Playing && oldState.status !== AudioPlayerStatus.Buffering) {
             console.warn(`Solara [${guildId}]: Player transitioned to Idle prematurely from ${oldState.status}. Resource likely failed or track ended immediately.`);
        }
        if (newState.error) {
            console.error(`Solara [${guildId}]: Player State Error: ${newState.error.message}`, newState.error);
        }
    };
    player.on('stateChange', stateChangeLogger);


    try {
        console.log(`Solara [${guildId}]: Fetching stream for ${nextSong.title}...`);

        const streamOptions = {
             discordPlayerCompatibility: true,
             requestOptions: {}
        };
        if (trackCookie) {
             streamOptions.requestOptions = {
                 headers: {
                     cookie: trackCookie
                 }
             };
             console.log(`Solara [${guildId}]: Applying cookie header to stream request.`);
        }

        const stream = await play.stream(nextSong.url, streamOptions);

        if (!stream || !stream.stream) throw new Error("play.stream returned invalid stream object.");

        console.log(`Solara [${guildId}]: Stream fetched (Type: ${stream.type}). Creating audio resource...`);
        const resource = createAudioResource(stream.stream, { inputType: stream.type });

        console.log(`Solara [${guildId}]: Audio resource created. Playing resource...`);

        const onError = (error) => {
            player.off('stateChange', stateChangeLogger);
            console.error(`Solara [${guildId}]: AudioPlayer Error during playback for ${nextSong.title}:`, error);
            guildVoiceState.nowPlaying = null;
            playTrack(guildId, client, youtubeCookie);
        };

        const onIdle = () => {
            player.off('stateChange', stateChangeLogger);
            console.log(`Solara [${guildId}]: Player became Idle after playing: ${guildVoiceState.nowPlaying}. Playing next.`);
            guildVoiceState.nowPlaying = null;
            playTrack(guildId, client, youtubeCookie);
        };

        player.once('error', onError);
        player.once(AudioPlayerStatus.Idle, onIdle);

        player.play(resource);

        console.log(`Solara [${guildId}]: player.play() called for ${nextSong.title}. Waiting for state changes.`);

    } catch (playError) {
        player.off('stateChange', stateChangeLogger);
         if (playError.message.includes("Sign in to confirm")) {
              console.error(`Solara [${guildId}]: Failed to stream ${nextSong.title} due to YouTube block (Sign in required). Cookie might be invalid or missing.`);
         } else {
            console.error(`Solara [${guildId}]: Error in playTrack setup/stream for ${nextSong.title}:`, playError);
         }
        guildVoiceState.nowPlaying = null;
        playTrack(guildId, client, youtubeCookie);
    }
}


module.exports = {
    name: "$voicePlay",
    description: "Plays audio in VC. Args: youtubeCookie;queryOrURL",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0] || !args[1]) {
             return "[Error: $voicePlay requires a YouTube cookie string AND a search query/URL. Format: Cookie;QueryOrURL]";
        }
        const youtubeCookie = args[0].trim();
        const query = args[1].trim();

         if (youtubeCookie.length < 50 || !youtubeCookie.includes('=')) {
              console.warn(`Solara [${context.guild?.id}]: Provided cookie seems very short or invalid.`);
         }

        if (!context.guild) return "[Error: Requires guild context]";
        if (!context.client.voiceManager) {
            console.error(`Solara [${context.guild?.id}]: Voice Manager not initialized on client!`);
            return "[Error: Voice Manager not initialized. Bot setup issue.]";
        }

        const guildId = context.guild.id;
        let guildVoiceState = context.client.voiceManager.get(guildId);

        if (!guildVoiceState?.connection || [VoiceConnectionStatus.Destroyed, VoiceConnectionStatus.Disconnected].includes(guildVoiceState.connection.state.status)) {
            const voiceChannelId = context.member?.voice?.channelId;
            if (!voiceChannelId) return "[Error: You need to be in a voice channel for me to join]";

            console.log(`Solara [${guildId}]: No valid connection found. Attempting to join channel ${voiceChannelId}.`);

            const oldState = context.client.voiceManager.get(guildId);
            if (oldState?.connection && oldState.connection.state.status !== VoiceConnectionStatus.Destroyed) {
                console.log(`Solara [${guildId}]: Destroying stale connection before rejoining.`);
                oldState.connection.destroy();
            }
            context.client.voiceManager.delete(guildId);

            try {
                const channel = await context.client.channels.fetch(voiceChannelId);
                if (!channel?.isVoiceBased()) return "[Error: Target channel is not a voice channel]";
                 if (!channel.joinable) return "[Error: Cannot join your voice channel. Check bot permissions (Connect, Speak).]";
                 if (!channel.speakable) console.warn(`Solara [${guildId}]: Bot might lack SPEAK permissions in channel ${voiceChannelId}.`);

                console.log(`Solara [${guildId}]: Joining voice channel ${channel.id}...`);
                const connection = joinVoiceChannel({ channelId: channel.id, guildId: guildId, adapterCreator: context.guild.voiceAdapterCreator });

                 connection.on(VoiceConnectionStatus.Ready, () => { console.log(`Solara [${guildId}]: Voice Connection Ready in channel ${connection.joinConfig.channelId}.`); });
                 connection.on(VoiceConnectionStatus.Connecting, () => { console.log(`Solara [${guildId}]: Voice Connection Connecting...`); });
                 connection.on(VoiceConnectionStatus.Signalling, () => { console.log(`Solara [${guildId}]: Voice Connection Signalling...`); });
                 connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
                     console.warn(`Solara [${guildId}]: Voice Connection Disconnected. Attempting to reconnect...`);
                     try {
                         await Promise.race([ entersState(connection, VoiceConnectionStatus.Signalling, 5_000), entersState(connection, VoiceConnectionStatus.Connecting, 5_000), ]);
                          console.log(`Solara [${guildId}]: Voice Connection Reconnected successfully.`);
                     } catch (error) {
                          console.log(`Solara [${guildId}]: Voice Connection Permanently Disconnected (Timeout or Destroyed). Cleaning up.`);
                          if (connection.state.status !== VoiceConnectionStatus.Destroyed) { connection.destroy(); }
                     }
                 });
                 connection.on(VoiceConnectionStatus.Destroyed, () => {
                    console.log(`Solara [${guildId}]: Voice Connection Destroyed. Cleaning up voice state.`);
                    const state = context.client.voiceManager.get(guildId);
                     if (state) {
                         state.player?.stop(true);
                         context.client.voiceManager.delete(guildId);
                     }
                });


                try { await entersState(connection, VoiceConnectionStatus.Ready, 30_000); }
                catch (error) {
                     console.error(`Solara [${guildId}]: Voice connection failed to reach Ready state:`, error);
                     connection.destroy();
                     return `[Error: Could not establish voice connection]`;
                 }

                console.log(`Solara [${guildId}]: Connection Ready. Creating Audio Player...`);
                const player = createAudioPlayer();
                player.on('error', error => {
                    console.error(`Solara [${guildId}]: !! Global Audio Player Error:`, error.message);
                    const state = context.client.voiceManager.get(guildId);
                    if(state) {
                        console.error(`Solara [${guildId}]: Global player error occurred. State: ${player.state.status}. Trying to recover by playing next.`);
                        playTrack(guildId, context.client, youtubeCookie);
                    }
                });

                console.log(`Solara [${guildId}]: Subscribing player to connection.`);
                connection.subscribe(player);

                guildVoiceState = { connection, player, queue: [], nowPlaying: null, volume: 1, loopMode: 'none' };
                context.client.voiceManager.set(guildId, guildVoiceState);
                console.log(`Solara [${guildId}]: New voice state created and stored.`);

            } catch (e) {
                console.error(`Solara [${guildId}]: CRITICAL Error joining voice channel ${voiceChannelId}:`, e);
                const state = context.client.voiceManager.get(guildId);
                if (state?.connection && state.connection.state.status !== VoiceConnectionStatus.Destroyed) {
                    state.connection.destroy();
                }
                context.client.voiceManager.delete(guildId);
                return `[Error joining voice channel: ${e.message}]`;
            }
        } else {
            if (guildVoiceState.connection.state.subscription?.player !== guildVoiceState.player) {
                  console.warn(`Solara [${guildId}]: Player was not subscribed to existing connection. Resubscribing.`);
                  guildVoiceState.connection.subscribe(guildVoiceState.player);
             }
             console.log(`Solara [${guildId}]: Using existing voice connection.`);
        }


        const currentGuildState = context.client.voiceManager.get(guildId);
        if (!currentGuildState || !currentGuildState.player) {
             console.error(`Solara [${guildId}]: Failed to get valid voice state after connection attempt.`);
             return "[Error: Internal voice state error.]";
        }
        const { player, queue } = currentGuildState;


        try {
            console.log(`Solara [${guildId}]: Validating input: ${query}`);
            const validation = await play.validate(query);
            let trackInfos = [];

            console.log(`Solara [${guildId}]: Input validated as type: ${validation}`);

             const createTrackInfo = (details) => ({
                 url: details.url,
                 title: details.title || 'Unknown Title',
                 duration: details.durationRaw || 'N/A',
                 requestedBy: context.user.id,
                 youtubeCookie: youtubeCookie
             });

            if (validation === 'yt_video' || validation === 'so_track' || validation === 'sp_track') {
                const trackData = await play.video_basic_info(query);
                if (!trackData?.video_details) throw new Error("Could not fetch track details from URL.");
                 trackInfos.push(createTrackInfo(trackData.video_details));
                console.log(`Solara [${guildId}]: Fetched single track: ${trackInfos[0].title}`);

            } else if (validation === 'search') {
                 let searchResults = await play.search(query, { limit: 1, source: { youtube: 'video' } });
                 if (!searchResults || searchResults.length === 0) return `[Error: No results found for "${query}"]`;
                 trackInfos.push(createTrackInfo(searchResults[0]));
                 console.log(`Solara [${guildId}]: Found search result: ${trackInfos[0].title}`);

            } else if (validation === 'yt_playlist' || validation === 'so_playlist' || validation === 'sp_album' || validation === 'sp_playlist') {
                console.log(`Solara [${guildId}]: Playlist/Album detected. Fetching tracks...`);
                const playlist = await play.playlist_info(query, { incomplete: true });
                 if (!playlist) throw new Error(`Could not fetch playlist info for ${query}`);

                 const allVideos = await playlist.all_videos();
                 if (!allVideos || allVideos.length === 0) return `[Error: Playlist/Album seems empty or failed to load: ${query}]`;

                 let addedCount = 0;
                 for (const video of allVideos) {
                     if (video.url && video.title) {
                          trackInfos.push(createTrackInfo(video));
                          addedCount++;
                     } else { console.warn(`Solara [${guildId}]: Skipping invalid track in playlist...`); }
                 }

                 if (addedCount === 0) return `[Error: No valid tracks found in playlist/album: ${query}]`;
                 console.log(`Solara [${guildId}]: Fetched ${addedCount} tracks from playlist/album.`);
                 context.channel.send(`Added **${addedCount}** tracks from the playlist/album.`);

            } else {
                 return `[Error: Invalid or unsupported link/query: "${query}" (Type: ${validation || 'unknown'})]`;
            }

            if (trackInfos.length === 0) {
                 return `[Error: Failed to extract any playable tracks from "${query}"]`;
            }

            const initialQueueLength = queue.length;
            const wasPlayerIdle = player.state.status === AudioPlayerStatus.Idle;

            trackInfos.forEach(track => queue.push(track));
            console.log(`Solara [${guildId}]: Added ${trackInfos.length} track(s) to queue. Queue size: ${queue.length}. Player was idle: ${wasPlayerIdle}`);

            const addedMessage = trackInfos.length === 1
                ? `Added to Queue: **${trackInfos[0].title}** (Position: ${initialQueueLength + 1})`
                : `Added **${trackInfos.length}** tracks to the queue.`;

            if (wasPlayerIdle && queue.length > 0) {
                 console.log(`Solara [${guildId}]: Player was idle, starting playback with playTrack().`);
                 playTrack(guildId, context.client, youtubeCookie);

                 if (initialQueueLength === 0 && trackInfos.length === 1) {
                     currentGuildState.nowPlaying = trackInfos[0].title;
                     return `Now Playing: **${trackInfos[0].title}**`;
                 } else { return addedMessage; }
            } else { return addedMessage; }

        } catch (error) {
            console.error(`Solara [${guildId}]: Error in $voicePlay processing query "${query}":`, error);
            const errorMessage =
            error.message?.includes("Sign in") ? "Age-restricted or private video (Cookie might be needed/invalid)." :
            error.message?.includes("confirm your age") ? "Age-restricted video (Cookie might be needed/invalid)." :
            error.message?.includes("Premiere") || error.message?.includes("live") ? "Livestreams or premieres not supported." :
            error.message || "Unknown error occurred.";
            return `[Error: Failed to process "${query}" - ${errorMessage}]`;
        }
    }
};