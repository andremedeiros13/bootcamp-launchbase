const user = {
    name : 'Mariana',
    transaction : [],
    balance : 0
};

function createTransaction(transaction) {
    user.transaction.push(transaction)

    if(transaction.type == 'credit'){
        user.balance = user.balance + transaction.value
    }else{
        user.balance = user.balance - transaction.value
    }
};


function getHigherTransactionByType ( type){
    let higherTransaction
    let higherValue = 0

    for(let transaction of user.transaction){
        if(transaction.type == type && transaction.value > higherValue){
            higherValue = transaction.value
            higherTransaction = transaction
        }
    }

    return higherTransaction
}

function getAverageTransactionValue() {
    let sum = 0

    for (let transaction of user.transaction){
        sum =+ transaction.value
    }
    return sum / user.transaction.length
}

function getTransactionsCount(){
    let count = {
        credit: 0,
        debit: 0
    }
    
    for (let transaction of user.transaction){
        if(transaction.type === 'credit'){
            count.credit++
        }else{
            count.debit++
        }
    }
    return count
}

createTransaction(transaction={type: 'credit', value: 50})
createTransaction(transaction={type: 'debit', value: 20})

console.log(user.balance)

console.log(getHigherTransactionByType('credit'))
console.log(getHigherTransactionByType('debit'))

console.log(getAverageTransactionValue())

console.log(getTransactionsCount())

