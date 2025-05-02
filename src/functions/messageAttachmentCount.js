module.exports = {
    name: "$messageAttachmentCount", description: "Returns the number of attachments on the triggering message.", takesBrackets: false,
    execute: async (context, args) => {
        return context.message?.attachments?.size.toString() ?? "0";
    }
};