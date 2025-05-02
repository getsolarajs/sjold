const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$repeat",
    description: "Executes Solara code repeatedly with a delay. Args: times;delayMs;code;[stopOnError=true]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: $repeat requires times, delayMs, and code]";
        const iterations = parseInt(args[0], 10);
        const delayMs = parseInt(args[1], 10);
        const codeToLoop = args[2];
        const stopOnError = (args[3]?.trim().toLowerCase() !== 'false');
        const MAX_ITERATIONS = 20; const MIN_DELAY = 250; // Adjusted limits
        if (isNaN(iterations) || iterations <= 0 || iterations > MAX_ITERATIONS) return `[Error: Invalid iteration count for $repeat (1-${MAX_ITERATIONS})]`;
        if (isNaN(delayMs) || delayMs < MIN_DELAY) return `[Error: Invalid delay for $repeat (Minimum ${MIN_DELAY}ms)]`;
        if (!codeToLoop) return "[Error: No code provided to repeat]";
        let count = 0; let intervalId = null;
        const executeLoopIteration = async () => {
            if (count >= iterations) { if (intervalId) clearInterval(intervalId); return; }
            count++;
            try { await context.client.functionParser.parse(codeToLoop, context); }
            catch (error) {
                console.error(`$repeat: Error during iteration ${count}:`, error);
                if (stopOnError) {
                    if (intervalId) clearInterval(intervalId); console.warn(`$repeat: Stopping loop due to error.`);
                    if (context.channel && !context.messageSent && !(error instanceof StopExecutionError)) {
                        context.channel.send(`⚠️ Loop stopped due to error on iteration ${count}: ${error.message}`).catch(console.error); context.messageSent = true;
                    }
                     if (error instanceof StopExecutionError && context.channel && !context.messageSent) {
                         context.channel.send(error.message).catch(console.error); context.messageSent = true;
                     }
                }
            }
        };
        intervalId = setInterval(executeLoopIteration, delayMs);
        return "";
    }
};