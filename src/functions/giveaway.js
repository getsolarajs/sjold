const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$giveaway", description: "Starts a simple giveaway. Args: duration;winnerCount;prize;[requiredRoleID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: Requires duration, winnerCount, and prize]";
        const durationStr = args[0]; const winnerCount = parseInt(args[1], 10); const prize = args[2]; const requiredRoleID = args[3];
        // Basic duration parsing (e.g., 10m, 1h, 2d)
        let durationMs = 0; const durationMatch = durationStr.match(/^(\d+)([mhd])$/);
        if (durationMatch) { const value = parseInt(durationMatch[1]); const unit = durationMatch[2]; if (unit === 'm') durationMs = value * 60 * 1000; else if (unit === 'h') durationMs = value * 60 * 60 * 1000; else if (unit === 'd') durationMs = value * 24 * 60 * 60 * 1000; }
        else { durationMs = parseInt(durationStr, 10); } // Assume ms if no unit
        if (isNaN(winnerCount) || winnerCount < 1) return "[Error: Invalid winner count]"; if (!prize) return "[Error: Prize cannot be empty]"; if (isNaN(durationMs) || durationMs <= 60000) return "[Error: Invalid duration (minimum 1 minute)]"; // Min 1 min

        const endTime = Date.now() + durationMs;
        const embed = new EmbedBuilder()
            .setTitle(`🎉 Giveaway: ${prize} 🎉`)
            .setDescription(`React with 🎉 to enter!\nEnds: $timeStamp[r;${endTime}]\nWinners: ${winnerCount}`)
            .setColor("Gold").setTimestamp(endTime);
        const button = new ButtonBuilder().setCustomId(`giveaway_enter_${Date.now()}`).setLabel("Enter 🎉").setStyle(ButtonStyle.Success); // Unique ID
        const row = new ActionRowBuilder().addComponents(button);

        try {
            // Use explicit send to get message object
            const sentMessage = await context.channel?.send({ embeds: [embed], components: [row] });
            if (!sentMessage) return "[Error: Failed to send giveaway message]";
            context.client.activeGiveaways.set(sentMessage.id, { endTime, prize, winnerCount, participants: new Set(), requiredRoleID, channelId: context.channel.id });
            setTimeout(() => context.client._endGiveaway(sentMessage.id, context.channel.id), durationMs); // Use internal helper
             // Need interaction handler for the button: name: `giveaway_enter_*`, type: button
             // Handler code: $onlyIf[$checkCondition[$memberExists[$authorID];==;true];You must be in the server] $let[gid;$getVar[giveawayMessageID]] $let[grole;$getVar[giveawayRoleReq]] $onlyIf[$checkCondition[$get[grole];==;];$or[$hasRole[$get[grole]];$hasPermission[Administrator]]] $interactionUpdate[] $setVar[giveawayParticipants_$get[gid];$appendVar[giveawayParticipants_$get[gid];$authorID;\n]] -> THIS IS COMPLEX & NEEDS REWORK
            return "";
        } catch (e) { return `[Error starting giveaway: ${e.message}]`; }
    }
}; // Note: Button handling needs a separate command/listener.