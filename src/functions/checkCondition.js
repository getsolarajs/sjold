module.exports = {
    name: "$checkCondition",
    description: "Evaluates a condition between two values. Args: value1;operator;value2. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: $checkCondition requires value1, operator, and value2]";
        const val1 = args[0]; const op = args[1].trim(); const val2 = args[2];
        const num1 = parseFloat(val1); const num2 = parseFloat(val2);
        const areNumbers = !isNaN(num1) && !isNaN(num2);
        let result = false;
        try {
            switch (op) {
                case '==': case '===': result = areNumbers ? num1 === num2 : val1 === val2; break;
                case '!=': case '!==': result = areNumbers ? num1 !== num2 : val1 !== val2; break;
                case '>': if (!areNumbers) return "[Error: Operator > requires numbers]"; result = num1 > num2; break;
                case '<': if (!areNumbers) return "[Error: Operator < requires numbers]"; result = num1 < num2; break;
                case '>=': if (!areNumbers) return "[Error: Operator >= requires numbers]"; result = num1 >= num2; break;
                case '<=': if (!areNumbers) return "[Error: Operator <= requires numbers]"; result = num1 <= num2; break;
                default: return `[Error: Unknown operator "${op}" in $checkCondition]`;
            }
        } catch (e) { return `[Error during condition check: ${e.message}]`; }
        return result.toString();
    }
};