const units = ["s", "m", "kg", "A", "K", "mol", "cd"];

export function rand(x){
    return Math.floor(Math.random() * x);
}

export function parseUnit(s){
    var cur = [0, 0, 0, 0, 0, 0, 0];
    s.split(" ").forEach(element => {
        var parts = element.split("^");
        if(parts.length == 1){
            cur[units.indexOf(parts[0])]++;
        }
        else{
            cur[units.indexOf(parts[0])] += parseInt(parts[1]);
        }
    });
    return cur;
}

export function arrayEquals(a, b){
    if(a.length != b.length){
        return false;
    }
    for(var i = 0; i < a.length; i++){
        if(a[i] != b[i]){
            return false;
        }
    }
    return true;
}

// checks if all non-zero elements in a are also non-zero elements in b
export function arrayContains(a, b){
    if(a.length != b.length){
        return false;
    }
    for(var i = 0; i < a.length; i++){
        if(a[i] != 0 && b[i] == 0){
            return false;
        }
    }
    return true;
}

export function arrayAdd(a, b){
    if(a.length != b.length){
        return undefined;
    }
    var c = [];
    for(var i = 0; i < a.length; i++){
        c.push(a[i] + b[i]);
    }
    return c;
}

export function arrayUnaryMinus(a){
    var c = [];
    for(var i = 0; i < a.length; i++){
        c.push(-a[i]);
    }
    return c;
}

export function arrayMinus(a, b){
    return arrayAdd(a, arrayUnaryMinus(b));
}

export function arrayScalarMult(a, mult){
    var c = [];
    for(var i = 0; i < a.length; i++){
        c.push(a[i] * mult);
    }
    return c;
}
