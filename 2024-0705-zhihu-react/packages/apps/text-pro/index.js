import { getNameFromJohn } from "@john/text-util";
const callMe = () => {
	console.log("--- can u c me ----");
	const name = getNameFromJohn(); // eslint 会报错，词句可用于验证 eslint 是否正常工作： 'name' is assigned a value but never used.
	console.log(name); // 该句是为了避免 eslint 报错
	return "hi!";
};

const responseString = callMe();
console.log(responseString);
