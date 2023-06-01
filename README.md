# FlynautAssessment
Flynaut Full Stack Developer Assessment 



![developer](https://img.shields.io/badge/Developed%20By-Aadarsh%20Kumar-red)
---
## Problem 1)
```javascript
// Find duplicate and same values in two array 
var fullWordList = ['1','2','3','4','5']; 
var wordsToRemove = ['1','2','3']; 
```

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
```javascript
// Longest-chain-of-letters-in-word-javascript 
const word = '00000111110101001111100001001'
```

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

Output:

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

```javascript
let obj1 = { "greeting": "hello" };
let obj2 = obj1;
obj1["greeting"] = "Bye";
console.log(obj1);
console.log(obj2);
```

Output:

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
```javascript
console.log("7" > 7) 
console.log("2">"21") 
console.log("KL">"S") 
```

## Solution 4)


```javascript
console.log("7" > 7);
console.log("2" > "21");
console.log("KL" > "S");
```

Output:

```
false
false
false
```

Let's break down each comparison:

1. `"7" > 7`: In this comparison, the string `"7"` is being compared with the number `7`. JavaScript performs type coercion and converts the string to a number, resulting in the expression `7 > 7`. Since 7 is not greater than 7 (it's equal), the result of this comparison is `false`.

2. `"2" > "21"`: Here, two strings are being compared. When comparing strings, JavaScript compares them character by character based on their Unicode values. In this case, the first character of `"2"` is `"2"` and the first character of `"21"` is also `"2"`. Since the first characters are equal, JavaScript moves on to the next characters. Since there are no more characters in `"2"`, and `"21"` has an additional character, the string `"2"` is considered smaller than `"21"`. Therefore, `"2" > "21"` evaluates to `false`.

3. `"KL" > "S"`: This comparison involves the strings `"KL"` and `"S"`. Similarly to the previous example, JavaScript compares the characters based on their Unicode values. The first character of `"KL"` is `"K"`, and the first character of `"S"` is `"S"`. In Unicode, `"K"` comes after `"S"`, so `"KL"` is considered greater than `"S"`. Thus, `"KL" > "S"` evaluates to `false`.

To summarize, the first comparison evaluates to `false` because a string is not directly comparable to a number. The second comparison evaluates to `false` because `"2"` is considered smaller than `"21"` in the context of string comparison. The third comparison evaluates to `false` because `"KL"` is considered smaller than `"S"` in the context of string comparison based on Unicode values.

---
## Problem 5)
```javascript
function average(a, b) { 
return a + b / 2; 
} 
console.log(average(2, 1)); 
```


## Solution 5)
The function `average(a, b)` in the provided code calculates the average of two numbers `a` and `b`. However, there is a precedence issue in the code due to the incorrect placement of parentheses. To fix this issue and calculate the average correctly, the code should be modified as follows:

```javascript
function average(a, b) {
  return (a + b) / 2;
}

console.log(average(2, 1));
```

Output:

```
1.5
```

The corrected code correctly calculates the average of `a` and `b` by first adding `a` and `b` together using parentheses `(a + b)` and then dividing the sum by 2 using the `/` operator. In the example provided, `average(2, 1)` returns `1.5` as the average of 2 and 1 is 1.5.
