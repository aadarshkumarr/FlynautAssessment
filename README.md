# FlynautAssessment
Flynaut Full Stack Developer Assessment 



![developer](https://img.shields.io/badge/Developed%20By-Aadarsh%20Kumar-red)
---
## Problem 1)
find duplicate and same values in two array 
var fullWordList = ['1','2','3','4','5']; 
var wordsToRemove = ['1','2','3']; 

## Solution 1):
To find duplicate and same values in two arrays, we can compare the elements of the arrays and identify the common values. 

```javascript
var fullWordList = ['1', '2', '3', '4', '5'];
var wordsToRemove = ['1', '2', '3'];

// Find common values (duplicates and same values)
var commonValues = fullWordList.filter(value => wordsToRemove.includes(value));

console.log("Common values:", commonValues);
```

Output:

```
Common values: [ '1', '2', '3' ]
```

The `filter()` method is used to iterate over the `fullWordList` array and keep only the elements that are present in the `wordsToRemove` array using the `includes()` method. The resulting array `commonValues` will contain the common values found in both arrays, which in this case are `'1'`, `'2'`, and `'3'`.


---
## Problem 2)
longest-chain-of-letters-in-word-javascript 
const word = '00000111110101001111100001001'


## Solution 2)
To find the longest chain of consecutive letters in a word, we can iterate over the characters of the word and keep track of the current chain length and the maximum chain length encountered.

```javascript
const word = '00000111110101001111100001001';

let currentChainLength = 0;
let maxChainLength = 0;

for (let i = 0; i < word.length; i++) {
  if (word[i] === '1') {
    currentChainLength++;
    if (currentChainLength > maxChainLength) {
      maxChainLength = currentChainLength;
    }
  } else {
    currentChainLength = 0;
  }
}

console.log("Longest chain of consecutive letters:", maxChainLength);
```

When you run this code, it will output:

```
Longest chain of consecutive letters: 5
```

In the code, we initialize `currentChainLength` and `maxChainLength` variables to 0. Then, we iterate over each character of the word. If the character is `'1'`, we increment `currentChainLength` and check if it is greater than `maxChainLength`. If it is, we update `maxChainLength` with the new value. If the character is not `'1'`, we reset `currentChainLength` to 0 since the chain is broken. Finally, we print the value of `maxChainLength`, which represents the longest chain of consecutive letters (in this case, `'1'`) in the word.

---
## Problem 3)
```javascript
let obj1 = { "greeting": "hello" }; 
let obj2 = obj1; 
obj1["greeting"] = "Bye"; 
console.log(obj1); 
console.log(obj2); 
```

## Solution 3)
If you run the following code:

```javascript
let obj1 = { "greeting": "hello" };
let obj2 = obj1;
obj1["greeting"] = "Bye";
console.log(obj1);
console.log(obj2);
```

You will get the following output in the console:

```
{ greeting: 'Bye' }
{ greeting: 'Bye' }
```

1. `let obj1 = { "greeting": "hello" };`: This line creates an object `obj1` with a property `greeting` set to the string value `"hello"`.

2. `let obj2 = obj1;`: This line assigns the reference of `obj1` to `obj2`. Both `obj1` and `obj2` now point to the same object in memory.

3. `obj1["greeting"] = "Bye";`: This line updates the value of the `greeting` property of `obj1` to `"Bye"`. Since `obj1` and `obj2` reference the same object, this change affects both variables.

4. `console.log(obj1);`: This line logs the value of `obj1` to the console. Since `obj1` was modified in the previous step, the output shows `{ greeting: 'Bye' }`.

5. `console.log(obj2);`: This line logs the value of `obj2` to the console. Since `obj2` references the same object as `obj1`, any changes made to the object are reflected in `obj2` as well. Therefore, the output shows `{ greeting: 'Bye' }`.


---
## Problem 4)
console.log("7" > 7) 
console.log("2">"21") 
console.log("KL">"S") 

## Solution 4)


---
## Problem 5)
 function average(a, b) { 
return a + b / 2; 
} 
console.log(average(2, 1)); 



## Solution 5)
function arrayAverage(arr){
    //Find the sum
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    //Get the length of the array
    var numbersCnt = arr.length;
    //Return the average / mean.
    return (sum / numbersCnt);
}
var arr = new Array(2, 10, 9, 6, 12, 3);
var avg = arrayAverage(arr);
console.log(avg);
