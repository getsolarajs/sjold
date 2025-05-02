module.exports = {
    name: "$switch",
    description: "Selects a value based on matching cases. Args: value;$case[match1;then1];$case[match2;then2];[$defaultCase[default]]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $switch requires a value and at least one $case]";
        const switchValue = args[0]; const cases = args.slice(1);
        let defaultValue = ""; let foundMatch = false;
        for (const caseArg of cases) {
             if (caseArg.toLowerCase().startsWith("$case[") && caseArg.endsWith("]")) {
                 const caseContent = caseArg.slice(6, -1); const caseParts = caseContent.split(';');
                 const matchValue = caseParts[0]; const thenValue = caseParts.slice(1).join(';');
                 if (switchValue === matchValue && !foundMatch) return thenValue;
             } else if (caseArg.toLowerCase().startsWith("$defaultcase[") && caseArg.endsWith("]")) {
                  defaultValue = caseArg.slice(13, -1);
             }
        }
        return defaultValue;
    }
};