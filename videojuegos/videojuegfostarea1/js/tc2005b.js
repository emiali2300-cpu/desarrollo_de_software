/*
 * Example functions to practice JavaScript
 *
 * Gilberto Echeverria
 * 2025-02-12
 */

"use strict";

function firstNonRepeating(str){
    const candidates = [];
    for(let i = 0; i<str.length;i++){
        let found  = false;
        for(let cand of candidates){
            if(cand.char == str[i]){
                cand.count +=1;
                found = true;
            }
        }
        if(!found){
            candidates.push({char: str[i],count : 1});
        }
    }
    console.log(candidates);
    for(let index in candidates){
        if(candidates [index].count == 1){
            return candidates[index].char;
        }
    }
}
function bubbleSort(arr){
    let lar = arr.length;
    let cam = true;
    while(cam){
        cam = false;
        for(let i =0;i<lar;i++){
            if(arr[i]>arr[i+1]){
                cam = true;
                let val = arr[i];
                arr[i]= arr[i+1];
                arr[i+1]=val;
            }
        }
    }
    return arr;
}
function invertArray(arr){
    const arr2 = [];
    let lar = arr.length;
    let x = 0;
    for(let i = lar-1;i>=0;i--){
        arr2[x]=arr[i];
        x+=1;
    }
    return arr2;
}

function invertArrayInplace(arr){
    const arr2 = [];
    let lar = arr.length;
    let x = 0;
    for(let i = lar-1;i>=0;i--){
        arr2[x]=arr[i];
        x+=1;
    }
    for(let i = 0; i<lar;i++){
        arr[i] = arr2[i];
    }
    return arr;
}
function capitalize(str){
    let may = true;
    let r = ""
    for(let i = 0; i<str.length;i++){
        if(may){
            r += str[i].toUpperCase();
            may = false;
        }
        else{
            r+=str[i];
        }
        if(str[i] == " "){
            may = true
        }
    }
    return r;
}
function mcd(a,b){
    if(a ==0){
        return 0;
    }
    for(let i = a ;i>=0;i--){
        if(a%i == 0 && b%i==0){
            return i;
        }
    }
    
}

function hackerSpeak(str){
    let r= "";
    let v = false;
    for(let i = 0;i<str.length;i++){
        if(str[i]=="a"){
            r+="4";
            v=true;
        }
        if(str[i]=="o"){
            r+="0";
            v=true;
        }
        if(str[i] == "e"){
            r+="3";
            v=true;
        }
        if(str[i]=="i"){
            r+="1";
            v=true;
        }
        if(str[i]=="s"){
            r+="5";
            v=true;
        }
        else if(v==false) {
            r+=str[i];
        }
        v=false;
    }
    str = r;
    return str;
}
function factorize(a){
    let o = [];
    for(let i = a;i>=0;i--){
        if(a%i==0){
            o.unshift(i);
        }
    }
    return o;
}
function deduplicate(arr){
    let arr2 = [];
    for(let i = 0; i<arr.length;i++){
        if(!arr2.includes(arr[i])){
            arr2[i] = arr[i];
        }
    }
    return arr2;
}
function findShortestString(arr){
    if(!arr[0]){
        return 0;
    }
    let len = arr[0].length;
    for(let i = 0; i<arr.length;i++){
        if(arr[i].length<len){
            len = arr[i].length;
        }
    }
    return len;
}
function isPalindrome(str){
    let r = "";
    for(let i = str.length-1;i>=0;i--){
        r+=str[i];
    }
    if(r == str){
        return true;
    }
    return false;
}
function sortStrings(arr){
    let lar = arr.length;
    let cam = true;
    let arr2 = arr;
    while(cam){
        cam = false;
        for(let i =0;i<lar -1;i++){
            if(arr[i]>arr[i+1]){
                cam = true;
                let v =arr2[i];
                arr2[i]=arr2[i+1]
                arr2[i+1]=v;
            }
        }
    }
    return arr2;
}
function stats(arr){
    if(arr.length === 0){
        return [0,0];
    }
    let v = 0;
    let v2 = 0;
    let c = 0;
    let m = 0;
    let v3 = 0;
    let arr2 = [];
    for(let i = 0;i<arr.length;i++){
        v += arr[i];
        v2 = arr[i];
        for(let j = 0;j<arr.length;j++){
            if(v2 == arr[j]){
                c += 1;
            }
        }
        if(c>m){
            v3 = v2;
            m = c;
            
        }
        c = 0;
    }
    v = v/arr.length;
    arr2  = [v,v3]
    return arr2;
}
function popularString(arr){
    if(arr.length === 0){
        return "";
    }
    let v = "";
    let v2 = "";
    let m = 0;
    let c = 0;
    for(let i = 0;i<arr.length;i++){
        v = arr[i];
        for(let j = 0;j<arr.length;j++){
            if(v == arr[j]){
                c +=1;
            }
        }
        if(c>m){
            v2 = v;
            m = c;
        }
        c = 0;
    }
    return v2;
}
function isPowerOf2(a) {
    if (a <= 0) return false;

    while (a % 2 == 0) {
        a = a / 2;
    }

    return a == 1;
}
function sortDescending(arr){
    arr =bubbleSort(arr);
    return invertArrayInplace(arr);
}
export {
    firstNonRepeating,
    bubbleSort,
    
    invertArray,

    invertArrayInplace,
    
    capitalize,
    
    mcd,
    
    hackerSpeak,
    
    factorize,
    
    deduplicate,
    
    findShortestString,
    
    isPalindrome,
    
    sortStrings,
    
    stats,
    
    popularString,
    
    isPowerOf2,
    
    sortDescending,
    
};
