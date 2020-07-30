exports.handler = async (event, context) => {
    let input = event;
    
    if (event.queryStringParameters && event.queryStringParameters.amount) {
        input = {
            amount: event.queryStringParameters.amount
        };
    } else if (event.body) {
        input = JSON.parse(event.body);
    }
    
    if (!input.amount) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "text/HTML" },
            body: `there is no input. sorry `
        };
    }
    
    let amount = Number(input.amount) * 100;
    
    console.log(`amount to change = ${amount}`);
    const coinsLookup = {
        25: 'quarters',
        10: 'dimes',
        5: 'nickels',
        1: 'pennies'
    };
    let coins = [0, 1, 5, 10, 25];
    const result = new Object();
    let coin = coins.pop();
    while (amount) {
        let coinName = coinsLookup[coin];
        let number = parseInt(amount / coin);
        if (number) {
            result[coinName] = number;
        }
        amount = amount % coin;
        coin = coins.pop();
    }
    // console.log(result);
    return { 
        statusCode: 200,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({res: result})
    };
};
