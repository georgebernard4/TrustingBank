// handleAccountOperation takes results from searching for files with a specific email, 
//and checks that the transaction should continue, using the function bankApproval
// and calculates the new balance
//( email, searchArray, password, amount, transactiontype) => [ true, null, endbalance] if transaction is approved
//                                               

// checkAccountOperation returns:
// [true, null, newBalance] if the transaction is approved
// [false, 'partialAmount', message] if transaction is only partially allowed
// [false, 'not approved', message] if transaction is not approved
// [false, 'counter proposal', message, object] where the counterProposal is an object to be developed
// progamatic errors will return [false, null, reason]
function checkAccountOperation(email,searchArray, password, amount, operation) {
  if (!searchArray) {
    return [false, null, `No account found for userArray: ${email}`];
  } else if (searchArray.length > 1) {
    return [false, null, `Multiple accounts found for userArray: ${email}`];
  }
  let account = searchArray[0];
  if (account.password !== password) {
    return [false, null, 'Incorrect password'];
  }
  
  
  let newBalance;
  let startBalance = Number(account.balance);
  // //uncomment to autoApprove balance inquiries
    // if(operation == 'balance') return [true,null,startBalance];
    amount       = Number(amount);
    switch (operation) {
      case 'deposit':
        newBalance = startBalance + amount;
        break;
      case 'withdraw':
        newBalance = startBalance - amount;
        break;
      case 'balance':
        newBalance = startBalance;
        break;
      default:
        return [false, null, `Invalid operation: ${operation}`];
    }
  
  const approvalResult = bankApproval(
    email,
    startBalance,
    newBalance,
    operation,
    {}  //account.transactionHistory to be implemented
  );

  if (!approvalResult[0]) {
    return approvalResult;
  }
  
  return [true, null, newBalance];
}

// bankApproval function returns:
// [true, null, ''] if the transaction is approved
// [false, 'partialAmount', message] if transaction is only partially allowed
// [false, 'not approved', message] if transaction is not approved
// [false, 'counter proposal', message, object] where the counterProposal is an object to be developed
// as above progamatic errors will return [false, null, reason]
function bankApproval(email, currentBalance, endingBalance, operation, transactionHistory) {
  return [true, null, ''];
}

module.exports = checkAccountOperation;