module.exports = {
    name: "$modifyMember", description: "Modifies member properties. Args: memberID;optionsJson;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires memberID and optionsJson]";
        const memberId = args[0]; const optionsJson = args[1]; const reason = args[2];
        let options; try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; }
        try { const member = await context.guild.members.fetch(memberId); await member.edit(options, reason); return ""; } // D.JS handles permissions/hierarchy internally mostly
        catch (e) { return `[Error modifying member ${memberId}: ${e.message}]`; }
    }
};