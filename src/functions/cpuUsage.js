module.exports = {
    name: "$cpuUsage", description: "Returns current CPU usage percentage (approximate).", takesBrackets: false,
    execute: async (context, args) => {
        const startUsage = process.cpuUsage(); const startTime = Date.now();
        const endTime = Date.now() + 100;
        while (Date.now() < endTime);
        const endUsage = process.cpuUsage(startUsage); const elapsedTime = Date.now() - startTime;
        const cpuPercent = ((endUsage.user + endUsage.system) / 1000 / elapsedTime) * 100;
        return cpuPercent.toFixed(2);
    }
};