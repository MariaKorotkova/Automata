let fs = require('fs');
let arg = process.argv;

fs.readFile(arg[2], (err, s1) => {
    if (err) {
        console.error(err);
        return;
    }
    let str1 = s1.toString();

    fs.readFile(arg[3], (err, s2) => {
        if (err) {
            console.error(err);
            return;
        }
        let str2 = s2.toString();
		let len = str2.length;
        
		let alph = new Array();

        for (i = 0; i < len; i++) {
            alph[str2.charAt(i)] = 0;
        }
        alph[""] = 0;
        let a = new Array(len + 1);

        for (j = 0; j <= len; j++) {
            a[j] = new Array()
        }
        for (i in alph) {
            a[0][i] = 0;
        }

        for (j = 0; j < len; j++) {
            p = a[j][str2.charAt(j)];
            a[j][str2.charAt(j)] = j + 1;
            for (i in alph) {
                a[j + 1][i] = a[p][i];
            }
        }

        function findSymbol(symbol, alph) {
            for (i in alph) {
                if (i == symbol) {
                    return i;
                }
            }
            return ""
        }

        let number = new Array();

        let start = 0;
        for (let i = 0; i < str1.length; i++) {
            let k = a[start][findSymbol(str1.charAt(i), alph)];
            start = k;
            if (k == str2.length) {
                number.push(i - str2.length + 1);
            }
        }
		let count = 0;
        let result = "";
        if (number.length == 0) {
            result = "not found\n";
        }
        else {
            for (i = 0; i < number.length; i++) {
                result += `${i+1} beggining: ${number[i]}\n`
				count ++;
            }
        }
        result += `String: ${str1}\nSubstring: ${str2}`
        console.log(result);
		console.log(count);
    })
});          
//str1 - строка 
//str2 - подстрока
//beggining - начало подстроки
//count - количество подстрок в строке